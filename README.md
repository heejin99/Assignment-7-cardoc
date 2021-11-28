# 🔥 **Assignment_Cardoc (with NestJS)**



🧱 **wanted x wecode 프리온보딩 백엔드 코스 - [Assignment 7] Cardoc**

- 일정: 2021년 11월 22일(월) 오후 5시 ~ 11월 29일(월) 오후 2시



## 🌎 **배포**

주소 : http://3.144.245.28:3000

<br>

## 🛠 **프로젝트 빌드 및 서버 실행 방법**

1. 상단의 Code 버튼을 눌러 경로를 복사한 후 클론 받습니다.

```
$ git clone https://github.com/heejin99/Assignment-7-cardoc.git
```

2. 패키지를 설치합니다.

```
$ npm install
```

3. 서버를 실행해 줍니다.

```
$ npm start
```

4. 정해진 API에 접근하여 서비스를 이용합니다.

<br>

## 📝 **과제 요구사항**

### ✔️ [필수 포함 사항]

- READ.ME 작성
  - 프로젝트 빌드, 자세한 실행 방법 명시
  - 구현 방법과 이유에 대한 간략한 설명
  - **서버 구조 및 디자인 패턴에 대한 개략적인 설명**
  - 완료된 시스템이 배포된 서버의 주소
  - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현


<details>
<summary>✔️  [주요 평가 사항 및 과제 안내]</summary>
<div markdown="1">       
<br>


  ## 1. 배경 및 공통 요구사항

<aside>
😁 카닥에서 실제로 사용하는 프레임워크를 토대로 타이어 API를 설계 및 구현합니다.

</aside>

- 데이터베이스 환경은 별도로 제공하지 않습니다.
 **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
- 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다.
- 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다.
- Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다.

[Copy of Code](https://www.notion.so/08e67c3cdc8e471fb1aab50e5963fb05)

---

## 2. 사용자 생성 API

🎁 **요구사항**

- ID/Password로 사용자를 생성하는 API.
- 인증 토큰을 발급하고 이후의 API는 인증된 사용자만 호출할 수 있다.

```jsx
/* Request Body 예제 */

 { "id": "candycandy", "password": "ASdfdsf3232@" }
```

---

## 3. 사용자가 소유한 타이어 정보를 저장하는 API

🎁 **요구사항**

- 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보를 저장한다.
- 한 번에 최대 5명까지의 사용자에 대한 요청을 받을 수 있도록 해야한다. 즉 사용자 정보와 trimId 5쌍을 요청데이터로 하여금 API를 호출할 수 있다는 의미이다.

```jsx
/* Request Body 예제 */
[
  {
    "id": "candycandy",
    "trimId": 5000
  },
  {
    "id": "mylovewolkswagen",
    "trimId": 9000
  },
  {
    "id": "bmwwow",
    "trimId": 11000
  },
  {
    "id": "dreamcar",
    "trimId": 15000
  }
]
```

🔍 **상세구현 가이드**

- 자동차 정보 조회 API의 사용은 아래와 같이 5000, 9000부분에 trimId를 넘겨서 조회할 수 있다.
 **자동차 정보 조회 API 사용 예제 → 
📄** [https://dev.mycar.cardoc.co.kr/v1/trim/5000](https://dev.mycar.cardoc.co.kr/v1/trim/5000)
**📄** [https://dev.mycar.cardoc.co.kr/v1/trim/9000
📄](https://dev.mycar.cardoc.co.kr/v1/trim/9000) [https://dev.mycar.cardoc.co.kr/v1/trim/11000
📄](https://dev.mycar.cardoc.co.kr/v1/trim/11000) [https://dev.mycar.cardoc.co.kr/v1/trim/15000](https://dev.mycar.cardoc.co.kr/v1/trim/15000)
- 조회된 정보에서 타이어 정보는 spec → driving → frontTire/rearTire 에서 찾을 수 있다.
- 타이어 정보는 205/75R18의 포맷이 정상이다. 205는 타이어 폭을 의미하고 75R은 편평비, 그리고 마지막 18은 휠사이즈로써 {폭}/{편평비}R{18}과 같은 구조이다.
 위와 같은 형식의 데이터일 경우만 DB에 항목별로 나누어 서로다른 Column에 저장하도록 한다.

---

## 4. 사용자가 소유한 타이어 정보 조회 API

🎁 **요구사항**

- 사용자 ID를 통해서 2번 API에서 저장한 타이어 정보를 조회할 수 있어야 한다.

</div>
</details>

<br>
<br>

## 🧬 **DB 모델링**

![image](https://user-images.githubusercontent.com/60311404/143764464-675afb96-111d-44ac-a823-e42c5ce4160a.png)

<br>

## 🏫 **사용 기술**

- Backend : [![img](https://camo.githubusercontent.com/cb0c26ab83b212946400b29c325debd89d07f0c36e3568c840dc6ae07127ca1b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6573744a532d4530323334453f7374796c653d666c6174266c6f676f3d4e6573744a53266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/cb0c26ab83b212946400b29c325debd89d07f0c36e3568c840dc6ae07127ca1b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6573744a532d4530323334453f7374796c653d666c6174266c6f676f3d4e6573744a53266c6f676f436f6c6f723d7768697465)</a> [![img](https://camo.githubusercontent.com/17131306fc490286432e1148ea92ac1754363621a9d185bf613ad6e0f4d33a96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f7374796c653d666c6174266c6f676f3d54797065536372697074266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/17131306fc490286432e1148ea92ac1754363621a9d185bf613ad6e0f4d33a96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f7374796c653d666c6174266c6f676f3d54797065536372697074266c6f676f436f6c6f723d7768697465)</a>
- DataBase : <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/></a>
- Collaboration : <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white"/></a>
- Deploy: <img src="https://img.shields.io/badge/Amazon AWS-181717?style=flat&logo=Amazon AWS&logoColor=white"/>

<br>

## 🔗 **구현 방법 & 이유**

#### 1) DB 모델링

- User : password를 bcrypt 암호화 방식을 이용해 저장하므로 varchar(200) 으로 설정했습니다.
- Tire : Tire API에 필요한 width, aspect_ratio, wheel_size 컬럼만 지정했습니다.
  - front Tire와 rear Tire의 값이 다른 경우를 대비해 code 값을 boolean으로 설정해 true면 front, false면 rear 로 인식하도록 했습니다.

#### 2) JWT 토큰 인증

- JWT를 이용해 로그인과 회원가입을 구현했습니다. `src/domain/auth`에 구현되어 있습니다.

  guard를 직접 정의해 `@UseGuard()` decorator를 사용했습니다.

  회원가입 후에도 바로 토큰을 발급해 로그인 절차가 따로 필요없습니다.

#### 3) 자동차 정보 조회 API

- 자동차 정보 조회 API의 호출을 위해 Axios 의 `httpSerivce`를  사용했습니다.

  rjax의 lastValueFrom 함수를 이용해 API의 마지막 value를 return 해주었습니다.

- frontTire와 rearTire의 value 형태는 `205/75R18` 과 같은 형태였기 때문에 `정규식`을 활용하여 / 와 R 을 구분해 폭, 편평비, 휠 사이즈를 구분해 저장했습니다.

#### 4) Docker

- Mysql - Docker image를 이용해 컨테이너를 생성 및 실행했습니다.
- Nest.js
  - Docker image를 이용해 컨테이너를 실행하려 했으나 TIMEDOUT 오류가 발생했고 이를 해결하지 못했습니다.

=> 그 결과 MySQL은 AWS의 RDBMS를 이용했고 NestJS 배포 또한 AWS를 이용해 진행했습니다.

배포를 Naver Cloud로 진행하려 했으나 Naver 홈페이지 오류로 접근이 불가능해 AWS를 이용했습니다.





## 📂 **폴더 구조**

```
📁 src
├── 📁 domain
│  ├── 📂 user
│  │  └── ...
│  ├── 📂 auth
│  │  └── ...
│  ├── 📂 entities
│  │  ├── 📂 base
│  │  │  └── 📄 base.entity.ts
│  │  ├── 📄 tires.entity.ts
|  |  ├── 📄 trims.entity.ts
|  |  └── 📄 user.entity.ts
│  ├── 📂 tire
│  │  ├── 📄 tire.module.ts
│  │  ├── 📄 tire.controller.spec.ts
│  │  ├── 📄 tire.controller.ts
│  │  ├── 📄 tire.repository.ts
│  │  ├── 📄 tire.service.spec.ts
│  │  └── 📄 tire.service.ts
│  ├── 📂 trim
│  |  ├── 📂 dto
│  │  |   ├── 📄 saveTire.dto.ts
│  │  ├── 📄 trim.module.ts
│  │  ├── 📄 trim.controller.spec.ts
│  │  ├── 📄 trim.controller.ts
│  │  ├── 📄 trim.repository.ts
│  │  ├── 📄 trim.service.spec.ts
│  │  └── 📄 trim.service.ts
├── 📂 global
│  ├── 📂 common
│  │  ├── 📄 CommonResponse.ts
│  │  ├── 📄 ErrorCode.ts
│  │  └── 📄 ErrorResponse.ts
│  ├── 📂 exception
│  │  └── 📄 ErrorHandler.ts
├── 📄 app.module.ts
└── 📄 main
📁 test
├── 📄 app.e2e-spec.ts
└── 📄 jest-e2e.json
📄 .env
📄 nest-cli.json
📄 docker-compose.yml
📄 package.json
📄 package-lock.json
📄 tsconfig.json
📄 tsconfig.build.json
📄 README.md
```


<br>

## ⚡ **작업 컨벤션**

#### - 코딩  컨벤션 :label:

- 파일 / 변수 네이밍 : CamelCase
- 탭 사이즈 : 4

#### - 깃 컨벤션 :triangular_ruler:

| 태그 이름        | 설명                                                         |
| :--------------- | ------------------------------------------------------------ |
| 💡Feat            | 새로운 기능을 추가할 경우                                    |
| 🐛Fix             | 버그를 고친 경우                                             |
| 🖌Design          | CSS 등 사용자 UI 디자인 변경                                 |
| ❗️BREAKING CHANGE | 커다란 API 변경의 경우                                       |
| ❗️HOTFIX          | 급하게 치명적인 버그를 고쳐야하는 경우                       |
| 🧷Style           | 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는 경우         |
| ✂️Refactor        | 프로덕션 코드 리팩토링                                       |
| 💬Comment         | 필요한 주석 추가 및 변경                                     |
| 📖Docs            | 문서를 수정한 경우                                           |
| ✔️Test            | 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경X)            |
| ⚒Chore           | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경X) |
| 🔧Rename          | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우           |
| 🔥Remove          | 파일을 삭제하는 작업만 수행한 경우                           |

<br>

## 🔗 **구현 기능**

### 1) 체크 리스트

- **사용자 생성 API**

  ✅ ID/Password로 사용자를 생성하는 API

  ✅ 인증 토큰 발급

  ✅ 로그인 API

- **타이어 정보 저장 API**

  ✅ trimID를 이용하여 사용자가 소유한 타이어 정보 저장

- **타이어 정보 조회 API**

  ✅ 사용자 ID를 이용하여 저장한 타이어 정보 조회

- **테스트 코드**

  ✅  Unit Test

<br>

## 🐾 **API**

[Postman 주소-링크](https://documenter.getpostman.com/view/14929657/UVJckGPM)

<br>

## 🐾 **API Test 방법**

#### 1. 위의 Postman 주소 링크를 클릭하여 Postman으로 들어갑니다.

#### 2. Sign Up, Sign In API를 이용하여 회원가입, 로그인을 진행합니다.

![image](https://user-images.githubusercontent.com/60311404/143782948-1213c40f-e8db-494c-a59d-dc2675c6230b.png)

![image](https://user-images.githubusercontent.com/60311404/143782984-0c15cf95-1b3f-40f9-9f7a-ee62dc5b43af.png)

#### 3. SaveTire, GetTire API를 이용하여 타이어 정보 저장, 타이어 정보 조회를 진행합니다.

![image](https://user-images.githubusercontent.com/60311404/143783035-0365a6c4-2529-4860-afd7-972a13d1b7ac.png)

- header에 token 값을 넣어야합니다.

![image](https://user-images.githubusercontent.com/60311404/143784100-6898b7a1-d163-4f14-8b05-4b448a899e1b.png)

- Trim_id에 값을 params로 넣으면 이에 대해 반환값이 출력됩니다.



<br>

## 🍭 **TIL 주소**

- 장희진 : 