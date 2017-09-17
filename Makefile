.ONESHELL:

.PHONY: build install clean

install:
	docker run -d --net=host --name wsshd --restart always wixb50/wsshd:latest

build:
	docker rmi wixb50/wsshd:latest
	docker build -t wixb50/wsshd .

clean:
	docker stop wsshd
	docker rm wsshd
