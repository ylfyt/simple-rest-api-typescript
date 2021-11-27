# Simple Rest API using Nodejs & Expressjs

### Cara menggunakan

-   Download repo ini
-   Jalankan command 'npm install'
-   Buat file '.env' pada folder repo dengan isinya adalah sebagai berikut,
    -   'DB_CONNECT=<url_mongodb_connection>'
    -   'TOKEN_SECRET=<random_string>'
    -   'PORT=3333'
-   Jalankan command 'npm start' dan server akan dimulai

### Routing URL

-   Base Url : 'https://localhost:3333'
-   End Point 'users' : 'http://localhost:3333/api/users'
    -   Register : 'http://localhost:3333/api/users/register'
        -   Pada body data user harus dikirim dengan format json
            Contohnya: { username: 'admin', password: '12345' }
    -   Login : 'http://localhost:3333/api/users/login'
        -   Pada body data user harus dikirim dengan format json
            Contohnya: { username: 'admin', password: '12345' }
        -   Setelah berhasil login akan didapatkan auth-token yang di mana harus token ini harus di bawa pada request-header dengan key 'auth-token' setiap melakukan request pada end point lain
-   End Point 'students' : 'http://localhost:3333/api/students'
    Auth-token yang didapatkan setelah login harus diset pada request header 'auth-token'

### Teknologi

-   Node js
-   Express js
-   Mongodb
-   Json Web Token
