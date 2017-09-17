FROM python:3

WORKDIR /usr/src/app

COPY . .
RUN pip install --no-cache-dir -i https://pypi.douban.com/simple -r requirements.txt
RUN python setup.py install

EXPOSE 5000

CMD [ "wsshd" ]