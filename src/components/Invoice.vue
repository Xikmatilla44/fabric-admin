<template>
    <v-container fluid>
    <div >

    

    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>Регистрация пользователя</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>    
  </b-navbar>

  <ValidationObserver ref="observer" v-slot="{ passes }">        
    <!-- <b-form @submit.prevent="passes(handleSubmit)" @reset="resetForm"> -->
    <b-form>
      <b-form-group
      id="fieldset-horizontal"      
      label-cols-lg="2"      
      label-align="right"      
      label="Счет-фактура №"            
      class="mt-2"
      label-for="input-horizontal">
      <b-form-input id="invoiceNo"></b-form-input>
    </b-form-group>

      <ValidationProvider rules="required" name="lastName" v-slot="{ valid, errors }">
        <b-form-group label="Ваша фамилия *" label-for="lastNameInput">
          <b-form-input
            type="text"
            id="lastNameInput"
            v-model="user.lastName"            
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

    <ValidationProvider rules="required" name="firstName" v-slot="{ valid, errors }">
        <b-form-group label="Ваша имя *" label-for="firstNameInput">
          <b-form-input
            type="text"
            id="firstNameInput"
            v-model="user.firstName"
            :state="errors[0] ? false : (valid ? true : null)"            
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider name="middleName" v-slot="{ valid, errors }">
        <b-form-group label="Ваше отчество" label-for="middleNameInput">
          <b-form-input
            type="text"
            id="middleNameInput"
            v-model="user.middleName"
            :state="errors[0] ? false : (valid ? true : null)"
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>


      <ValidationProvider rules="required|email" name="Email" v-slot="{ valid, errors }">
        <b-form-group
          label="Эл. плчта *"
          label-for="emailInput">
          <b-form-input
            id="emailInput"
            type="email"
            v-model="user.email"
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
            v-model="user.password"
            :state="errors[0] ? false : (valid ? true : null)"
            
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider  rules="required|confirmed:password" name="Password confirmation"    v-slot="{ valid, errors }"  >
        <b-form-group label="Подтвердите пароль:" label-for="confirmationInput">
          <b-form-input
           id="confirmationInput"
            type="password"
            v-model="user.confirmation"
            :state="errors[0] ? false : (valid ? true : null)"
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>           
      <!-- <button class="btn btn-primary" :disabled="status.registering">Register</button> -->      
      <b-button type="submit" class="mr-2" variant="primary">Pегистрировать</b-button>
      <!-- <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> -->
      <b-button type="reset" variant="outline-primary">Cброс</b-button>
      <router-link to="/login" class="btn btn-link">Войти в систему</router-link>
    </b-form>
  </ValidationObserver>  
</div>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  name: "BootstrapForm",
  components: {
    ValidationObserver,
    ValidationProvider
  },  
     data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                middleName: '',
                email: '',
                password: '',
                confirmPassword:''
            },
            submitted: false
        }
  }, 
  }
</script>
