FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir -p /app
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY . /app/
