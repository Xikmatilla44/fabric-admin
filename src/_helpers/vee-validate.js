import Vue from 'vue'
import { required, confirmed, length, email } from "vee-validate/dist/rules";
import { ValidationProvider, ValidationObserver,extend } from "vee-validate";

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend("required", {
  ...required,
  message: "Это поле обязательно к заполнению"
});

extend("email", {
  ...email,
  message: "Это поле должно быть действительным адресом электронной почты"
});

extend("confirmed", {
  ...confirmed,
  message: "Это поле подтверждения не совпадает"
});

extend("length", {
  ...length,
  message: "This field must have 2 options"
});
