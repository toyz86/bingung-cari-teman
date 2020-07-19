import Vue from 'vue';

export default function({ $axios, error }) {

  $axios.onError((err) => {
    let code = 0;

    if (code === 0) {
      console.log(`[AXIOS#onError] Displaying error Internet page`);
      error({
        statusCode: 0,
        message: `Data tidak ditemukan`,
      });
      return;
    }
  });
}
