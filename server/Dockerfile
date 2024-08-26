FROM golang:1.20-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o ecw-server ./server.go

EXPOSE 8080

CMD ["./ecw-server"]
