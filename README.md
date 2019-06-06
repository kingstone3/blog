## 生产环境:

| a      | b                                |
| ------ | -------------------------------- |
| NodeJS | 通过 yum 安装 |
| NPM    | 随 NodeJS 安装   |
| redis  | 前端缓存                     |
| Nginx  | 需配置代理规则                   |
| Jenkins | 持续集成                   |
| pm2    | 后台运行软件                     |
> 需要在 Jenkins 里配置项目

## 开发环境:

### Local
| a      | b                                |
| ------ | -------------------------------- |
| NodeJS | 通过 yum 安装 |
| NPM    | 随 NodeJS 安装 |
| redis  | 前端缓存                     |
| Nginx  | 需配置代理规则                   |
> 1. 安装完成后需要将 servers/common 软链接到 servers/website-account/common 和 servers/website-admin/common
> 2. 安装完成后需要 touch servers/common/config.json 和 browsers/common/config.json

### Docker
1. ``` git clone git@github.com:kingstone3/website-docker-env.git ```
2. ``` touch .env ``` + 按照本地环境修改配置文件
3. ``` docker-compose build ```
4. ``` docker-compose up -d ```
