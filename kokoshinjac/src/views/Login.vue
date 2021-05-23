<template>
    <div class="loginBody">
    <div class="loginForm">
        <input v-model="mail" type="email" placeholder="Unesite e-mail">
        <input v-model="password" type="password" placeholder="Unesite lozinku">
        <button @click="login()">Prijava</button>
    </div>
    </div>
</template>

<script>
import {auth} from '../../firebase';

export default {
    data() {
        return {
            mail:'mail@mail.com',
            password:'lozinka',
        }
    },
    methods: {
        login() {
            if(this.mail.trim() !== '' && this.password.trim() !==''){
                auth.signInWithEmailAndPassword(this.mail, this.password)
                    .then((userCredential) => {
                        // Signed in
                        // ...
                        this.$emit('loginSucc', false);
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert('Korisničko ime ili lozinka nije ispravna')
                    });
            }
            else{
                alert('Unesite e-mail ili lozinku')
            }
        },
    },
}
</script>

<style>
    .loginBody{
        
    }

    .loginForm{
        margin-top: 150px;
        display: flex;
        flex-direction: column;
        width: 200px;
        margin-left: auto;
        margin-right: auto;
        transform: scale(1.5);
        }
    .loginForm button {
        margin-top: 5px;
        border-radius: 10px 10px;
    }
</style>