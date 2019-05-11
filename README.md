## 生产环境:

| a      | b                                |
| ------ | -------------------------------- |
| NodeJS | 首先通过 yum 安装，后通过 n 管理 |
| NPM    | 随 NodeJS 安装，后升级到新版本   |
| redis  | 前端缓存                     |
| Nginx  | 需配置代理规则                   |
| Jenkins | 持续集成                   |
| pm2    | 后台运行软件                     |

## 开发环境:

### Local
| a      | b                                |
| ------ | -------------------------------- |
| NodeJS | 首先通过 yum 安装，后通过 n 管理 |
| NPM    | 随 NodeJS 安装，后升级到新版本   |
| redis  | 前端缓存                     |
| Nginx  | 需配置代理规则                   |
| nodemon | 自动重启 node                  |

### Docker
1. ``` git clone git@github.com:kingstone3/website-docker-env.git ```
2. ``` touch .env ``` + 按照本地环境修改配置文件
3. ``` docker-compose build ```
4. ``` docker-compose up -d ```
