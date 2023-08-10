// *應該算局部引用，這個套件可以，當有需要跨元件溝通的時候，在父層provide，不同子層inject，進行資料傳遞
import mitt from 'mitt';

const emitter = mitt();

export default emitter;
