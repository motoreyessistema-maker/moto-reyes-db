FROM alpine:latest
RUN apk add --no-cache ca-certificates unzip wget
WORKDIR /pb
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.5/pocketbase_0.23.5_linux_amd64.zip \
 && unzip pocketbase_0.23.5_linux_amd64.zip \
 && chmod +x pocketbase \
 && rm pocketbase_0.23.5_linux_amd64.zip
EXPOSE 8090
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data"]
