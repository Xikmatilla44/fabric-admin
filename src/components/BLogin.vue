<template>
  <div>
    <h2>Войти в систему</h2>
  <ValidationObserver ref="observer" v-slot="{ passes }">        
    <b-form @submit.prevent="passes(handleSubmit)">

      <ValidationProvider rules="required" name="Username" v-slot="{ valid, errors }">
        <b-form-group
          label="Имя пользователя:"
          label-for="UsernameInput">
          <b-form-input
            id="UsernameInput"
            type="email"
            v-model="username"
            :state="errors[0] ? false : (valid ? true : null)"
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required" name="Password" vid="password" v-slot="{ valid, errors }"  >
        <b-form-group label="Пароль:" label-for="passwordInput">
          <b-form-input
            id="passwordInput"
            type="password"
            v-model="password"
            :state="errors[0] ? false : (valid ? true : null)"
            
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>     
      

      <b-button type="submit" id="submitButton" :disabled="status.loggingIn" class="mr-2" variant="primary">Войти</b-button>
      <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />      
      <router-link to="/register" class="btn btn-link">Регистрация</router-link>
    </b-form>
  </ValidationObserver>
  </div>
</template>

<script>
//import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState(['status'])
    },
    created () {        
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions(['login', 'logout']),
        handleSubmit () {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
            }
        }
    }
};
</script>
