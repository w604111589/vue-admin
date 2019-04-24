import { debounce } from '@/utils';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Resize extends Vue {
  private sidebarElm = null;

  private mounted() {
    (this as any).__resizeHandler = debounce(() => {
      if ((this as any).chart) {
        (this as any).chart.resize();
      }
    }, 100)
    window.addEventListener('resize', (this as any).__resizeHandler);

    (this as any).sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    this.sidebarElm && (this.sidebarElm as any).addEventListener('transitionend', this.sidebarResizeHandler);
  }

  private beforeDestroy() {
    window.removeEventListener('resize', (this as any).__resizeHandler)
    this.sidebarElm && (this.sidebarElm as any).removeEventListener('transitionend', this.sidebarResizeHandler)
  }

  private sidebarResizeHandler(e: any) {
    if (e.propertyName === 'width') {
      (this as any).__resizeHandler();
    }
  }

}




