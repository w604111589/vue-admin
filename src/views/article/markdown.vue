<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :class-name="'sub-navbar '+postForm.status" :zIndex="200" >
        <CommentDropdown v-model="postForm.comment_disabled"/>
        <PlatformDropdown v-model="postForm.platforms"/>
        <SourceUrlDropdown v-model="postForm.source_uri"/>
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >发布</el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput
                v-model="postForm.title"
                :maxlength="100"
                name="name"
                :readonly="readAccess"
                :disabled="readAccess"
                required
              >标题</MDinput>
            </el-form-item>

            <div>
              <span style="font-size:14px;color:#606266">标签：</span>
              <el-drag-select
                v-model="postForm.labels"
                style="width:320px;margin-bottom:20px;"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                />
              </el-drag-select>
            </div>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.author"
                      :remote-method="getRemoteUserList"
                      filterable
                      remote
                      placeholder="搜索用户"
                    >
                      <el-option
                        v-for="(item,index) in userListOptions"
                        :key="item+index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.release_time"
                      type="datetime"
                      placeholder="选择日期时间"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="60px" label="重要性:" class="postInfo-container-item">
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="margin-top:8px;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input
            :rows="1"
            v-model="postForm.abstract"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="请输入内容"
          />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <div style="margin-bottom:20px;font-size: 14px;color: #606266;">
          文章头图：
          <Upload v-model="postForm.image_uri" />
        </div>

        <div class="editor-container">
          <markdown-editor
            id="contentEditor"
            ref="contentEditor"
            v-model="postForm.content"
            :height="300"
            :z-index="20"
          />
        </div>


      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import MarkdownEditor from '@/components/MarkdownEditor/index.vue';
import Upload from '@/components/Upload/singleImage3.vue';
import MDinput from '@/components/MDinput/index.vue';
import Sticky from '@/components/Sticky/index.vue'; // 粘性header组件
import { validateURL } from '@/utils/validate';
import { fetchArticleAdmin, updateArticle, createArticle } from '@/api/article';
import { userSearch } from '@/api/remoteSearch';
import { Message } from 'element-ui';
import { getLabel } from '@/api/log';
import elDragSelect from '@/components/DragSelect/index.vue';
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown,
} from './components/Dropdown';

const defaultForm = {
  status: 0,
  title: '', // 文章题目
  content: '', // 文章内容
  abstract: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  release_time: undefined, // 前台展示时间
  id: undefined,
  labels: [],
  platforms: ['a-platform'],
  comment_disabled: 0, //0：打开；1：关闭
  importance: 0,
  type: 1,
};

const validateRequire = (rule: any, value: any, callback: any) => {
  if (value === '') {
    Message({
      message: rule.field + '为必传项',
      type: 'error',
    });
    callback(new Error(rule.field + '为必传项'));
  } else {
    callback();
  }
};
const validateSourceUri = (rule: any, value: any, callback: any) => {
  if (value) {
    if (validateURL(value)) {
      callback();
    } else {
      Message({
        message: '外链url填写不正确',
        type: 'error',
      });
      callback(new Error('外链url填写不正确'));
    }
  } else {
    callback();
  }
};

@Component({
  components: {
    MDinput,
    Upload,
    Sticky,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown,
    MarkdownEditor,
    elDragSelect,
  }
})
export default class Markdown extends Vue {
  private options: any[] = [];
  private postForm: any = Object.assign({}, defaultForm);
  private loading: boolean = false;
  private userListOptions: any[] = [];
  private rules: any = {
    image_uri: [{ validator: validateRequire }],
    title: [{ validator: validateRequire }],
    content: [{ validator: validateRequire }],
    source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
  };
  private tempRoute: any = {};
  private html: string = '';


  private get contentShortLength() {
    return this.postForm.abstract.length;
  }
  private set contentShortLength(val) {
    this.postForm.abstract.length = val;
  }

  private get isEdit() {
    const id = this.$route.params && this.$route.params.id;
    return id ? true : false;
  }

  private get readAccess() {
    return this.isEdit ? true : false;
  }

  private get lang() {
    return this.$store.getters.language;
  }

  private created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    } else {
      this.postForm = Object.assign({}, defaultForm);
    }
    this.tempRoute = Object.assign({}, this.$route);
    this.fetchLabel();
  }

  private fetchLabel() {
    getLabel().then((response: any) => {
      // tslint:disable-next-line:forin
      for (let i in response.data.items) {
        const temp = { value: response.data.items[i].id, label: response.data.items[i].name};
        this.options.push(temp);
      }
    });
  }

  private fetchData(id: number | string) {
    fetchArticleAdmin(id)
      .then((response: any) => {
        this.postForm = response.data;
        // Just for test
        // this.postForm.title += `   Article Id:${this.postForm.id}`;
        // this.postForm.abstract += `   Article Id:${this.postForm.id}`;

      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  private submitForm() {
    (this.$refs.postForm as any).validate((valid: any) => {
      if (valid) {
        this.loading = true;
        this.postForm.status = 1;
        if (this.isEdit) {
          updateArticle(this.postForm)
            .then((response: any) => {
              this.$message({
                message: '更新成功',
                type: 'success',
                duration: 1000,
              });
            })
            .catch((err: any) => {
              this.$message({
                message: '更新失败',
                type: 'error',
                duration: 1000,
              });
            });
        } else {
          createArticle(this.postForm)
            .then((response: any) => {
              this.$message({
                message: '创建成功',
                type: 'success',
                duration: 1000,
              });
              this.jumpToList();
            })
            .catch((err: any) => {
              this.$message({
                message: '创建失败',
                type: 'error',
                duration: 1000,
              });
            });
        }

        // this.postForm.status = 1;
        this.loading = false;
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  private draftForm() {
    if (
      this.postForm.content.length === 0 ||
      this.postForm.title.length === 0
    ) {
      this.$message({
        message: '请填写必要的标题和内容',
        type: 'warning',
      });
      return;
    }
    this.postForm.status = 0;
    if (this.isEdit) {
      updateArticle(this.postForm)
        .then((response: any) => {
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000,
          });
          // this.jumpToList();
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      createArticle(this.postForm)
        .then((response: any) => {
          this.$message({
            message: '保存为草稿',
            type: 'success',
            showClose: true,
            duration: 1000,
          });
          this.jumpToList();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }

    this.$message({
      message: '保存成功',
      type: 'success',
      showClose: true,
      duration: 1000,
    });
    // this.postForm.status = 'draft';
    this.postForm.status = 0;
  }

  private jumpToList() {
    this.$router.push('/components/list');
  }

  private getRemoteUserList(query: any) {
    userSearch(query).then((response: any) => {
      if (!response.data.items) {
        return false;
      }
      this.userListOptions = response.data.items.map((v: any) => v.username);
    });
  }

}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>