FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main main.go

FROM scratch

COPY --from=builder /app/main /app/main

ENTRYPOINT ["/app/main"]

