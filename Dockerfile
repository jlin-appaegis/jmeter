FROM nginx:latest

WORKDIR /test-runner

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

RUN apt-get install -y --no-install-recommends openjdk-11-jre nodejs

RUN curl -O https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.5.tgz && \
    tar zxf apache-jmeter-5.5.tgz &&  \
    rm apache-jmeter-5.5.tgz

COPY . .

RUN npm ci
