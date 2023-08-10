// http://tinymce.ax-z.cn/
// https://codepen.io/snowman12320/pen/BaGREeO?editors=1010
// https://ithelp.ithome.com.tw/articles/10197824
<template>
  <div>
    <textarea id="my-editor" v-model="content"></textarea>
  </div>
</template>
<script>
// This domain is not registered with Tiny Cloud. Please see the quick start guide or create an account. 會失敗可能需要API KEY
import tinymce from 'tinymce/tinymce'; //* npm install tinymce@^6
import 'tinymce/themes/silver/theme';
import 'tinymce/langs/zh_TW';

import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/help';
export default {
  mounted () {
    tinymce.init({
      selector: '#my-editor',
      language: 'zh_TW',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste help wordcount'
      ],
      // eslint-disable-next-line no-multi-str
      toolbar: 'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help',
      menubar: 'file edit view insert format tools table help',
      toolbar_mode: 'floating',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      height: 500
    });
  }
};
</script>
