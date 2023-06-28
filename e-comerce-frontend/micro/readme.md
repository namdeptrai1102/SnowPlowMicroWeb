B1: tạo một thư mục mới tên micro trong folder code của bạn, rồi đặt tất cả các file này trong folder đó

B2: chạy lệnh "docker run -d --mount type=bind,source=${pwd}/micro,destination=/config -p 9090:9090 snowplow/snowplow-micro:1.7.0 --collector-config /config/micro.conf --iglu /config/iglu.json "

- micro chạy ở cổng 9090
