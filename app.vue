<template>
<div>
  <form @submit.prevent="loginUser()">
    <input type="text" name="email" v-model="login.email">
    <input type="password" name="password" v-model="login.password">
    <button type="submit">
      Submit
    </button>
  </form>
  <div>
    {{response}}
  </div>
</div>
</template>

<script setup lang="ts">
const name = ref(null);
const file = ref(null);
const login = ref({
  email: null,
  password: null,
})
const response = ref(null)
const handleFileChange = (e) => {
  file.value = e.target.files[0];
};
const submit = async () => {
  const data = new FormData();
  data.append('file', file.value);
  data.append('name', name.value);
  data.append('age', "18")
  console.log(data)
  const response = await $fetch('/api/upload', {
    method: 'POST',
    body: data,
  })

  console.log(response);
}


  const loginUser = async () => {
    const res = await $fetch('/api/auth/login', {
      method: "POST",
      body: login.value,
    });
    response.value = res;
  }
</script>