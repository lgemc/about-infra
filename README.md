# Que contiene este repo?

Contiene informacion varia sobre como crear infraestructura, con la finalidad
de montar un cluster kubernetes y algunos servicios de ejemplo que pueden
correr dentro de dicho cluster

## Contenido
- terraform: infraestructura como codigo de aws para crear las maquinas en ec2 y el networking requerido
- ansible: como replicar etcd de kubernetes e instalarlo en el servidor, tambien se incluye la instalacion y
configuracion de k3s en un nodo master y un nodo child
- go-monorepo: servicios que consumen y publican a kafka
- node-monorepo: api y servicios para sincronizar rethinkdb con sockets
- react-monorepo: codigo para una ui conectada a sockets con reactividad
- Makefile.sample: makefile (no funciona full con las rutas) de ejemplo de como construir las imagenes docker y la infraestructura
- kubes: codigo kubernetes para montar los servicios de ejemplo
