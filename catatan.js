import { defaultValueSchemable } from "sequelize/types/lib/utils"

oauth
=> standarisasi pabrik untuk proses delegasi atau authorisasi
kenapa ada oauth? karena sbg aturan untuk authorisasi

fungsi oauth?
misal updaet status di fb tapi masuk juga ke twitter / ig
untuk ngeblash tersebut butuh authoorisasi

implementasi : ketika regis/login -> bisa login lewat fb atau git

oauth basic komponen : ?????

gugle kasih data ke web 

1. api key / token 
=> identifir apk
2. acces token => user identifier
3. scope => untuk ngeblash ke apk lain, hampir sama dengn authorisasi. butuh permision untuk masukk

metode :
1. oatuh 1 => 
2. oatuh 2 => lebih simpe dianding yang pertama

yang dibutuhkan buat oatuh
1. signin => setelahnya bisa lihat profil, defaultValueSchemable
terus bisa pake api yang lain

step :
1. sign in
2. configurasi projek
3. select atau create project
4. authorisasi masih localhost => ada client id yang akan disematkan di html
5. dwonload client configurasi
6. buat html => taro scriptnya di Headers
7. kalau udah dapat id, kirim ke server
8. kirim idToken hasi res dr google

pemasangan ajax di index, method postMessage, url(user-google-signinn), data(idtoken)


