<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>Your email: {{ email }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
    };
  },
  
  created() {
    axios.get('/users.json')
      .then(res => {
        const { data } = res;
        const users = Object.keys(data).map(key => {
          const user = data[key];
          user.id = key;
          return user;
        });
        console.log('users', users);
        this.email = users[0].email;
      })
      .catch(err => {
        console.log(err);
        alert('get users error');
      });
  }
};
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>
