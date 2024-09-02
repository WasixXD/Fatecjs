#! /bin/bash


curl -X POST -H "Content-Type: application/json" -d '{"autor": "Lucas", "piada": "Por que o computador foi preso? Porque ele executou um comando."}' localhost:3000/piada/new

curl -X POST -H "Content-Type: application/json" -d '{"autor": "Pedro", "piada": "Piu"}' localhost:3000/piada/new

curl -X GET localhost:3000/piada/

curl -X GET localhost:3000/piada/random/