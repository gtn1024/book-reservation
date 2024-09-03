# Book Reservation

## 数据库

```shell
docker run -d \
   --name db-for-book_reservation \
   -e POSTGRES_USER=book_reservation \
   -e POSTGRES_PASSWORD=123456 \
   -e POSTGRES_DB=book_reservation \
   -e PGDATA=/var/lib/postgresql/data/pgdata \
   -e TZ=Asia/Shanghai \
   -e PGTZ=Asia/Shanghai \
   -e LANG=en_US.UTF-8 \
   -p 15432:5432 \
   postgres:16
```
