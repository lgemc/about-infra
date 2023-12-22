## Start

Remember if you have no su, you can execute

```bash
doas -u root <<command>>
```

Add to /etc/fstab this line

```bash
echo /etc/fstab >> cgroup /sys/fs/cgroup cgroup defaults 0 0
```

Add to /etc/cgconfig.conf this config

```bash
cat > /etc/cgconfig.conf <<EOF
mount {
  cpuacct = /cgroup/cpuacct;
  memory = /cgroup/memory;
  devices = /cgroup/devices;
  freezer = /cgroup/freezer;
  net_cls = /cgroup/net_cls;
  blkio = /cgroup/blkio;
  cpuset = /cgroup/cpuset;
  cpu = /cgroup/cpu;
}
EOF
```

On file /etc/update-extlinux.conf add or set this config

**Note: add new config params without delete old ones**

```bash
default_kernel_opts="pax_nouderef quiet rootfstype=ext4 cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory"
```

Refresh your boot loader

On grub

```bash
doas -u root grub-mkconfig -o /boot/grub/grub.cfg
```

On extlinux

```bash
doas -u root update-extlinux
```

**Restart the machine**

# Installing dependecies

```bash
doas -u root  apk add --no-cache cni-plugins --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
export PATH=$PATH:/usr/share/cni-plugins/bin
```

Add next content to /etc/profile.d/cni.sh file

```bash
#!/bin/sh
echo "export PATH=\$PATH:/usr/share/cni-plugins/bin" > /etc/profile.d/cni.sh
```

Install iptables

```bash
doas -u root apk add iptables
```

Download k3s distribution

```bash
curl -sfL https://get.k3s.io | sh -
```

# Add it to startup

```bash
cat > /etc/init.d/k3s <<EOF
#!/sbin/openrc-run

depend() {
    after net-online
    need net
}

start_pre() {
    rm -f /tmp/k3s.*
}

supervisor=supervise-daemon
name="k3s"
command="/usr/bin/k3s"
command_args="server --disable=traefik >>/var/log/k3s.log 2>&1" # disable traefik due to difficut configurations

pidfile="/var/run/k3s.pid"
respawn_delay=5

set -o allexport
if [ -f /etc/environment ]; then source /etc/environment; fi
if [ -f /etc/rancher/k3s/k3s.env ]; then source /etc/rancher/k3s/k3s.env; fi
set +o allexport
EOF
```

Convert file to executable

```bash
doas -u root chmod +x /etc/init.d/k3s
```

Add to default run level (on each startup)

```bash
doas -u root rc-update add k3s default
```

To start k3s in current session:

```bash
doas -u root rc-service k3s start
```
