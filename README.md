# Web CCCD

## 1. Cài đặt

2.1. Tải thư viện

```bash
npm install / npm install --force
```

2.2. Chạy web ở chế độ deployment

```bash
npm start
```

Web chạy ở URL:

```bash
http://localhost:3000
```

2.3. Build web:

```bash
npm run build
```

## 3. Cấu trúc folder

```
├───build                        #----> folder phục vụ deploy
├───public                       #-----> file statict
└───src
    ├───assets                   #----->   Chứa các file tĩnh như ảnh, font, etc...
    ├───components               #-----> Chứa các components có thể tái sử dụng ở nhiều nơi
    │   ├───Button 
    │   ├───Chip
    ├───config                   #-----> Chứa các file config như router config, firebase, etc...
    ├───contexts                 #-----> Chứa file định nghĩa các context sử dụng cho useContext
    ├───hooks                    #-----> Chứa các file hooks được custom
    ├───layouts                  #-----> Chứa các file, các phần tử tạo nên khung cơ bản của UI
    │   ├───components
    │   └───Layout
    ├───pages                    #-----> Chứa các folder tạo nên từng trang
    │   ├───Admin       #-----> Chứa các folder tạo nên danh mục quản trị
    ├───routers                  #-----> Chứa các đường dẫn tới từng trang
    ├───services                 #-----> Chứa các cấu hình API và các API
    │   └───api
    ├───store                    #-----> Chứa các state được custom cho useReducer và useContext
    └───utils                    #-----> Chứa các hàm hỗ trợ 
```
