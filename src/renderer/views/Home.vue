<template>
<div class="home">
	<Button @click="openInitiate">打开一个新的窗口-窗口链接地址是服务器</Button>
	<Button @click="openView">打开一个新的窗口-窗口地址是本地文件</Button>
	<Button @click="notice">显示通知</Button>
	<hr>
	<Button @click="checkUpdate">点击按钮手动检查更新</Button>
	<Button @click="alert">查看当前应用版本</Button>
	<Button @click="update">安装程序</Button>
	<hr>
	<Button @click="sendGet">发送get请求</Button>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data () {
    return {
      txt: 'hello electron1'
    };
  },
  methods: {
    sendGet () {
      axios.get('/api/user?ID=12345')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    checkUpdate () {
      this.$ev.checkUpdate();
    },
    openInitiate () {
      this.$ev.openInitiateWin();
    },
    openView () {
      this.$ev.openViewWin();
    },
    alert () {
      console.log(this.$env);
    },
    update () {
      this.$ev.installationProgram();
    },
    // 复制事件
    copyHandle (e) {
      console.log(e);
    },
    // 粘贴事件
    pasteHandle (e) {
      console.log(e);
    },
    notice () {
      const myNotification = new Notification('通知标题', {
        body: '通知的主体内容'
      });
      myNotification.onclick = () => {
        console.log('Notification clicked');
      };
    }
  }
};
</script>

<style scoped lang="sass">
</style>
