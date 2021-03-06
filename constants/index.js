import { sizestrWithUnit } from '@/utils/utils'

// 不定单位使用formatter，固定单位使用unit
export const USAGE_CONFIG = {
  'all.bucket_bytes': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.bucket_objects': {
    unit: '个',
  },
  'all.buckets': {
    unit: '个',
  },
  'all.containers': {},
  'all.containers.cpu': {},
  'all.containers.memory': {},
  'all.cpu_commit_rate.running': {},
  'all.disks': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.disks.any_pool': {},
  'all.disks.any_pool.attached': {},
  'all.disks.any_pool.detached': {},
  'all.disks.any_pool.unready': {},
  'all.disks.attached': {},
  'all.disks.detached': {},
  'all.disks.prepaid_pool': {},
  'all.disks.prepaid_pool.attached': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.disks.prepaid_pool.detached': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.disks.prepaid_pool.unready': {},
  'all.disks.unready': {},
  'all.eip': {
    unit: '个',
  },
  'all.eip.floating_ip': {},
  'all.eip.floating_ip.used': {},
  'all.eip.public_ip': {},
  'all.eip.used': {
    unit: '个',
  },
  'all.memory_commit_rate.running': {},
  'all.nics': {},
  'all.nics.group': {},
  'all.nics.guest': {},
  'all.nics.host': {},
  'all.nics.lb': {},
  'all.nics.reserve': {},
  'all.pending_delete_servers': {
    unit: '个',
  },
  'all.pending_delete_servers.any_pool': {},
  'all.pending_delete_servers.any_pool.cpu': {},
  'all.pending_delete_servers.any_pool.disk': {},
  'all.pending_delete_servers.any_pool.ha': {},
  'all.pending_delete_servers.any_pool.ha.cpu': {},
  'all.pending_delete_servers.any_pool.ha.disk': {},
  'all.pending_delete_servers.any_pool.ha.memory': {},
  'all.pending_delete_servers.any_pool.isolated_devices': {},
  'all.pending_delete_servers.any_pool.memory': {},
  'all.pending_delete_servers.cpu': {
    unit: '核',
  },
  'all.pending_delete_servers.disk': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.pending_delete_servers.ha': {},
  'all.pending_delete_servers.ha.cpu': {},
  'all.pending_delete_servers.ha.disk': {},
  'all.pending_delete_servers.ha.memory': {},
  'all.pending_delete_servers.isolated_devices': {
    unit: '块',
  },
  'all.pending_delete_servers.memory': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.pending_delete_servers.prepaid_pool': {},
  'all.pending_delete_servers.prepaid_pool.cpu': {},
  'all.pending_delete_servers.prepaid_pool.disk': {},
  'all.pending_delete_servers.prepaid_pool.ha': {},
  'all.pending_delete_servers.prepaid_pool.ha.cpu': {},
  'all.pending_delete_servers.prepaid_pool.ha.disk': {},
  'all.pending_delete_servers.prepaid_pool.ha.memory': {},
  'all.pending_delete_servers.prepaid_pool.isolated_devices': {},
  'all.pending_delete_servers.prepaid_pool.memory': {},
  'all.ports': {},
  'all.ports_exit': {},
  'all.ready_servers': {},
  'all.ready_servers.any_pool': {},
  'all.ready_servers.any_pool.cpu': {},
  'all.ready_servers.any_pool.disk': {},
  'all.ready_servers.any_pool.ha': {},
  'all.ready_servers.any_pool.ha.cpu': {},
  'all.ready_servers.any_pool.ha.disk': {},
  'all.ready_servers.any_pool.ha.memory': {},
  'all.ready_servers.any_pool.isolated_devices': {},
  'all.ready_servers.any_pool.memory': {},
  'all.ready_servers.cpu': {
    unit: '个',
  },
  'all.ready_servers.disk': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.ready_servers.ha': {},
  'all.ready_servers.ha.cpu': {},
  'all.ready_servers.ha.disk': {},
  'all.ready_servers.ha.memory': {},
  'all.ready_servers.isolated_devices': {
    unit: '块',
  },
  'all.ready_servers.memory': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.ready_servers.prepaid_pool': {},
  'all.ready_servers.prepaid_pool.cpu': {},
  'all.ready_servers.prepaid_pool.disk': {},
  'all.ready_servers.prepaid_pool.ha': {},
  'all.ready_servers.prepaid_pool.ha.cpu': {},
  'all.ready_servers.prepaid_pool.ha.disk': {},
  'all.ready_servers.prepaid_pool.ha.memory': {},
  'all.ready_servers.prepaid_pool.isolated_devices': {},
  'all.ready_servers.prepaid_pool.memory': {},
  'all.running_servers': {
    unit: '台',
  },
  'all.running_servers.any_pool': {},
  'all.running_servers.any_pool.cpu': {},
  'all.running_servers.any_pool.disk': {},
  'all.running_servers.any_pool.ha': {},
  'all.running_servers.any_pool.ha.cpu': {},
  'all.running_servers.any_pool.ha.disk': {},
  'all.running_servers.any_pool.ha.memory': {},
  'all.running_servers.any_pool.isolated_devices': {},
  'all.running_servers.any_pool.memory': {},
  'all.running_servers.cpu': {
    unit: '核',
  },
  'all.running_servers.disk': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.running_servers.ha': {},
  'all.running_servers.ha.cpu': {},
  'all.running_servers.ha.disk': {},
  'all.running_servers.ha.memory': {},
  'all.running_servers.isolated_devices': {
    unit: '块',
  },
  'all.running_servers.memory': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.running_servers.prepaid_pool': {},
  'all.running_servers.prepaid_pool.cpu': {},
  'all.running_servers.prepaid_pool.disk': {},
  'all.running_servers.prepaid_pool.ha': {},
  'all.running_servers.prepaid_pool.ha.cpu': {},
  'all.running_servers.prepaid_pool.ha.disk': {},
  'all.running_servers.prepaid_pool.ha.memory': {},
  'all.running_servers.prepaid_pool.isolated_devices': {},
  'all.running_servers.prepaid_pool.memory': {},
  'all.servers': {
    unit: '台',
  },
  'all.servers.any_pool': {},
  'all.servers.any_pool.cpu': {},
  'all.servers.any_pool.disk': {},
  'all.servers.any_pool.ha': {},
  'all.servers.any_pool.ha.cpu': {},
  'all.servers.any_pool.ha.disk': {},
  'all.servers.any_pool.ha.memory': {},
  'all.servers.any_pool.isolated_devices': {},
  'all.servers.any_pool.memory': {},
  'all.servers.cpu': {
    unit: '核',
  },
  'all.servers.disk': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.servers.ha': {},
  'all.servers.ha.cpu': {},
  'all.servers.ha.disk': {},
  'all.servers.ha.memory': {},
  'all.servers.isolated_devices': {
    unit: '块',
  },
  'all.servers.memory': {
    formatter: val => sizestrWithUnit(val),
  },
  'all.servers.prepaid_pool': {},
  'all.servers.prepaid_pool.cpu': {},
  'all.servers.prepaid_pool.disk': {},
  'all.servers.prepaid_pool.ha': {},
  'all.servers.prepaid_pool.ha.cpu': {},
  'all.servers.prepaid_pool.ha.disk': {},
  'all.servers.prepaid_pool.ha.memory': {},
  'all.servers.prepaid_pool.isolated_devices': {},
  'all.servers.prepaid_pool.memory': {},
  'all.snapshot': {
    unit: '个',
  },
  'baremetals': {
    unit: '个',
  },
  'baremetals.cpu': {
    unit: '核',
  },
  'baremetals.memory': {
    formatter: val => sizestrWithUnit(val),
  },
  'bucket_bytes': {
    formatter: val => sizestrWithUnit(val),
  },
  'bucket_objects': {
    unit: '个',
  },
  'buckets': {
    unit: '个',
  },
  'containers': {},
  'containers.cpu': {},
  'containers.memory': {},
  'disks': {
    formatter: val => sizestrWithUnit(val),
  },
  'disks.attached': {
    formatter: val => sizestrWithUnit(val),
  },
  'disks.detached': {
    formatter: val => sizestrWithUnit(val),
  },
  'disks.unready': {},
  'eip': {
    unit: '个',
  },
  'eip.floating_ip': {},
  'eip.floating_ip.used': {},
  'eip.public_ip': {},
  'eip.used': {
    unit: '个',
  },
  'enabled_hosts': {
    unit: '台',
  },
  'enabled_hosts.any_pool': {},
  'enabled_hosts.any_pool.cpu': {},
  'enabled_hosts.any_pool.cpu.virtual': {},
  'enabled_hosts.any_pool.memory': {},
  'enabled_hosts.any_pool.memory.virtual': {},
  'enabled_hosts.cpu': {},
  'enabled_hosts.cpu.virtual': {},
  'enabled_hosts.memory': {},
  'enabled_hosts.memory.virtual': {},
  'enabled_hosts.prepaid_pool': {},
  'enabled_hosts.prepaid_pool.cpu': {},
  'enabled_hosts.prepaid_pool.cpu.virtual': {},
  'enabled_hosts.prepaid_pool.memory': {},
  'enabled_hosts.prepaid_pool.memory.virtual': {},
  'hosts': {},
  'hosts.any_pool': {},
  'hosts.any_pool.cpu': {},
  'hosts.any_pool.cpu.virtual': {},
  'hosts.any_pool.memory': {},
  'hosts.any_pool.memory.virtual': {},
  'hosts.cpu': {},
  'hosts.cpu.virtual': {},
  'hosts.memory': {},
  'hosts.memory.virtual': {},
  'hosts.prepaid_pool': {},
  'hosts.prepaid_pool.cpu': {},
  'hosts.prepaid_pool.cpu.virtual': {},
  'hosts.prepaid_pool.memory': {},
  'hosts.prepaid_pool.memory.virtual': {},
  'isolated_devices': {},
  'isolated_devices.any_pool': {},
  'isolated_devices.prepaid_pool': {},
  'networks': {},
  'nics': {},
  'nics.group': {},
  'nics.guest': {},
  'nics.lb': {},
  'pending_delete_servers': {},
  'pending_delete_servers.any_pool': {},
  'pending_delete_servers.any_pool.cpu': {},
  'pending_delete_servers.any_pool.disk': {},
  'pending_delete_servers.any_pool.ha': {},
  'pending_delete_servers.any_pool.ha.cpu': {},
  'pending_delete_servers.any_pool.ha.disk': {},
  'pending_delete_servers.any_pool.ha.memory': {},
  'pending_delete_servers.any_pool.isolated_devices': {},
  'pending_delete_servers.any_pool.memory': {},
  'pending_delete_servers.cpu': {},
  'pending_delete_servers.disk': {},
  'pending_delete_servers.ha': {},
  'pending_delete_servers.ha.cpu': {},
  'pending_delete_servers.ha.disk': {},
  'pending_delete_servers.ha.memory': {},
  'pending_delete_servers.isolated_devices': {},
  'pending_delete_servers.memory': {},
  'pending_delete_servers.prepaid_pool': {},
  'pending_delete_servers.prepaid_pool.cpu': {},
  'pending_delete_servers.prepaid_pool.disk': {},
  'pending_delete_servers.prepaid_pool.ha': {},
  'pending_delete_servers.prepaid_pool.ha.cpu': {},
  'pending_delete_servers.prepaid_pool.ha.disk': {},
  'pending_delete_servers.prepaid_pool.ha.memory': {},
  'pending_delete_servers.prepaid_pool.isolated_devices': {},
  'pending_delete_servers.prepaid_pool.memory': {},
  'ports': {},
  'ports_exit': {},
  'ready_servers': {
    unit: '台',
  },
  'ready_servers.any_pool': {},
  'ready_servers.any_pool.cpu': {},
  'ready_servers.any_pool.disk': {},
  'ready_servers.any_pool.ha': {},
  'ready_servers.any_pool.ha.cpu': {},
  'ready_servers.any_pool.ha.disk': {},
  'ready_servers.any_pool.ha.memory': {},
  'ready_servers.any_pool.isolated_devices': {},
  'ready_servers.any_pool.memory': {},
  'ready_servers.cpu': {
    unit: '核',
  },
  'ready_servers.disk': {
    formatter: val => sizestrWithUnit(val),
  },
  'ready_servers.ha': {},
  'ready_servers.ha.cpu': {},
  'ready_servers.ha.disk': {},
  'ready_servers.ha.memory': {},
  'ready_servers.isolated_devices': {
    unit: '块',
  },
  'ready_servers.memory': {
    formatter: val => sizestrWithUnit(val),
  },
  'ready_servers.prepaid_pool': {},
  'ready_servers.prepaid_pool.cpu': {},
  'ready_servers.prepaid_pool.disk': {},
  'ready_servers.prepaid_pool.ha': {},
  'ready_servers.prepaid_pool.ha.cpu': {},
  'ready_servers.prepaid_pool.ha.disk': {},
  'ready_servers.prepaid_pool.ha.memory': {},
  'ready_servers.prepaid_pool.isolated_devices': {},
  'ready_servers.prepaid_pool.memory': {},
  'regions': {
    unit: '个',
  },
  'running_servers': {
    unit: '台',
  },
  'running_servers.any_pool': {},
  'running_servers.any_pool.cpu': {},
  'running_servers.any_pool.disk': {},
  'running_servers.any_pool.ha': {},
  'running_servers.any_pool.ha.cpu': {},
  'running_servers.any_pool.ha.disk': {},
  'running_servers.any_pool.ha.memory': {},
  'running_servers.any_pool.isolated_devices': {},
  'running_servers.any_pool.memory': {},
  'running_servers.cpu': {
    unit: '核',
  },
  'running_servers.disk': {
    formatter: val => sizestrWithUnit(val),
  },
  'running_servers.ha': {},
  'running_servers.ha.cpu': {},
  'running_servers.ha.disk': {},
  'running_servers.ha.memory': {},
  'running_servers.isolated_devices': {
    unit: '块',
  },
  'running_servers.memory': {
    formatter: val => sizestrWithUnit(val),
  },
  'running_servers.prepaid_pool': {},
  'running_servers.prepaid_pool.cpu': {},
  'running_servers.prepaid_pool.disk': {},
  'running_servers.prepaid_pool.ha': {},
  'running_servers.prepaid_pool.ha.cpu': {},
  'running_servers.prepaid_pool.ha.disk': {},
  'running_servers.prepaid_pool.ha.memory': {},
  'running_servers.prepaid_pool.isolated_devices': {},
  'running_servers.prepaid_pool.memory': {},
  'servers': {
    unit: '台',
  },
  'servers.any_pool': {},
  'servers.any_pool.cpu': {},
  'servers.any_pool.disk': {},
  'servers.any_pool.ha': {},
  'servers.any_pool.ha.cpu': {},
  'servers.any_pool.ha.disk': {},
  'servers.any_pool.ha.memory': {},
  'servers.any_pool.isolated_devices': {},
  'servers.any_pool.memory': {},
  'servers.cpu': {
    unit: '核',
  },
  'servers.disk': {
    formatter: val => sizestrWithUnit(val),
  },
  'servers.ha': {},
  'servers.ha.cpu': {},
  'servers.ha.disk': {},
  'servers.ha.memory': {},
  'servers.isolated_devices': {
    unit: '块',
  },
  'servers.memory': {
    formatter: val => sizestrWithUnit(val),
  },
  'servers.prepaid_pool': {},
  'servers.prepaid_pool.cpu': {},
  'servers.prepaid_pool.disk': {},
  'servers.prepaid_pool.ha': {},
  'servers.prepaid_pool.ha.cpu': {},
  'servers.prepaid_pool.ha.disk': {},
  'servers.prepaid_pool.ha.memory': {},
  'servers.prepaid_pool.isolated_devices': {},
  'servers.prepaid_pool.memory': {},
  'snapshot': {
    unit: '个',
  },
  'storages': {
    formatter: val => sizestrWithUnit(val),
  },
  'storages.any_pool': {},
  'storages.any_pool.commit_rate': {},
  'storages.any_pool.virtual': {},
  'storages.commit_rate': {},
  'storages.prepaid_pool': {},
  'storages.prepaid_pool.commit_rate': {},
  'storages.prepaid_pool.virtual': {},
  'storages.virtual': {},
  'vpcs': {
    unit: '个',
  },
  'wires': {
    unit: '个',
  },
  'zones': {
    unit: '个',
  },
}
