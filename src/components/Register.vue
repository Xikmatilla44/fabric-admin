<template>
    <div>
        <h2>Регистрация</h2>
         <ValidationObserver ref="observer" v-slot="{ passes }">
        <form @submit.prevent="passes(handleSubmit)">
            <div class="form-group">                
                <label for="lastName">Ваша фамилия *</label>                
                 <ValidationProvider rules="required" name="lastName" v-slot="{ valid, errors }">
                    <input type="text" v-model="user.lastName"  :state="errors[0] ? false : (valid ? true : null)" name="lastName" class="form-control" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>
                                 
            </div>
            <div class="form-group">
                <label for="firstName">Ваше имя *</label>
                <ValidationProvider name="firstName" rules="required" v-slot="{ errors }">
                    <input type="text" v-model="user.firstName"   name="firstName" class="form-control" />                
                </ValidationProvider>
            </div>            
            <div class="form-group">
                <label for="fatherName">Ваше отчество</label>                
                <input type="text" v-model="user.fatherName" name="fatherName" class="form-control" />                
            </div>           
            <hr>
            <div class="form-group">
                <label for="username">Эл. почта *</label>
                <ValidationProvider name="email" rules="required" v-slot="{ errors }">
                    <input type="text" v-model="user.email"   name="email" class="form-control" />                
                </ValidationProvider>
            </div>
            <div class="form-group">
                <label htmlFor="password">Пароль *</label>
                <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                    <input type="password" v-model="user.password"  name="password" class="form-control" />  
                </ValidationProvider>              
            </div>
            <div class="form-group">
                <label htmlFor="confirmPassword">Подтвердите пароль *</label>
                <ValidationProvider name="confirmPassword" rules="required" v-slot="{ errors }">
                    <input type="password" v-model="user.confirmPassword" name="confirmPassword" class="form-control" />   
                </ValidationProvider>             
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.registering">Register</button>
                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/login" class="btn btn-link">Cancel</router-link>
            </div>
        </form>
         </ValidationObserver>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                fatherName: '',
                email: '',
                password: '',
                confirmPassword:''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState(['status'])
    },
    methods: {
        ...mapActions(['register']),
        async  handleSubmit() {
            this.submitted = true;
            await this.$refs.observer.validate().then(valid=>{
                if(valid)
                    this.register(this.user);
            });
        }
    }
};
</script>