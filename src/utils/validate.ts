export const isValidUsername = (str: string) => ['admin', 'editor', 'wangtao', '18062789252'].indexOf(str.trim()) >= 0;

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);
