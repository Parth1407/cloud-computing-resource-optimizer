# Dataset Directory

Place the Alibaba Cluster Trace 2018 `machine_usage.csv` file here.

## Source
- GitHub: https://github.com/alibaba/clusterdata
- Direct: http://aliopentrace.oss-cn-beijing.aliyuncs.com/v2018Traces/machine_usage.tar.gz

## Steps
1. Download `machine_usage.tar.gz`
2. Extract it: `tar -xzf machine_usage.tar.gz`
3. Place the resulting `machine_usage.csv` in this folder

## Schema (columns in order)
| # | Column | Description |
|---|--------|-------------|
| 1 | machine_id | Unique server ID |
| 2 | time_stamp | Timestamp (seconds) |
| 3 | cpu_util_percent | CPU utilization % |
| 4 | mem_util_percent | Memory utilization % |
| 5 | mem_gps | Memory bandwidth GB/s (often empty) |
| 6 | mkpi | Cache misses per 1K instructions (often empty) |
| 7 | net_in | Incoming network traffic (normalized) |
| 8 | net_out | Outgoing network traffic (normalized) |
| 9 | disk_io_percent | Disk I/O utilization % |
