import Vue from 'vue';

Vue.config.errorHandler = () => {
};
if (process.browser) {
    window.onerror = function (message, source, lineno, colno, error) {
        // console.log('messageError', message);
        // console.log('source', source);
        // console.log('lineno', lineno);
        // console.log('colno', colno);
        // console.log('erorrrr', error);
    };
}
