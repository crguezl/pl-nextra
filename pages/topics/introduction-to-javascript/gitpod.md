---
title: "GitPod: VS Code in Browsers"
--- 

## GitHub Editor

### Period in a repo

From any GitHub repo or pull request, developers can simply press the period (`.`) key to bring up the browser-based VS Code environment with the source code file ready for editing. 

### Substitute github by github.dev in a GitHub URL

That dot press to bring up the web-based editor takes you to <https://github.dev/>, so the same one-press `.` functionality can be duplicated just by changing a URL from "github.com" to "github.dev".

### Documentation

Esta documentación es sólo para usuarios GitHub Enterprise

* [Web-based editor](https://docs.github.com/es/codespaces/developing-in-codespaces/web-based-editor)

### Referencias

* [One-Click VS Code in Browser from GitHub Repo ](https://visualstudiomagazine.com/articles/2021/08/31/github-vs-code.aspx)

## GitPod 

Gitpod is an open source platform for automated and ready-to-code development environments that blends into your existing workflow. It enables developers to describe their dev environment as code and start instant and fresh development environments for each new task directly from your browser.

### Aprendiendo GitPod

* [Getting Started](https://www.gitpod.io/docs/getting-started)

### Configure Gitpod

### Botón GitPod

Para tener el botón GitPod instala la correspondiente extensión en Chrome o Firefox

* [GitPod Browser Extension](https://www.gitpod.io/docs/browser-extension/)
* [Chrome extension](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki?hl=es) in the webstore
* [fireFox addon](https://addons.mozilla.org/es/firefox/addon/gitpod/)
* [GitPod Screencasts](https://www.youtube.com/playlist?list=PL3TSF5whlprXVp-7Br2oKwQgU4bji1S7H) 7 videos


### Open in VSCode

En el menú de arriba a la izquierda elige la opción "Open in VS Code":

![](/images/gitpod/gitpod-open-in-vscode.png)

Tienes que instalar la extensión [GitPod]() the VSCode y darle los permisos.
A partir de ese momento puedes editar con tu VSCode local en el contenedor de GitPod.

See it running in my local machine, after the VSCode has been opened:

![](/images/gitpod/gitpod-opened-in-vscode.png)

Observe the output in the terminal. We are running on the GitPod docker container


¡Ojo! tu VSCode local está compartiendo el GitPod Workspace. Cualquier modificación que hagas en el VSCode local se refleja en el GitPod Workspace en la nube y viceversa.


### Snapshots

Whenever you want to share a reproducible example on StackOverflow or an issue report, providing real code that can be quickly tried, executed and explored is the best you can do. Online code playgrounds, such as CodePen or JSFiddle, are an excellent way to do that, as they are very accessible for both the creator and the readers. Unfortunately, they are not available for every programming platform, language and often don’t work for larger projects or examples.

Gitpod lets you create reproducible examples for any programming environment and any size of project.

No matter what state your Gitpod workspace is in, taking a Snapshot captures everything and provides you a link to share anywhere: on issues, forums (StackOverflow), emails and blogs. Anybody who clicks on a snapshot link instantly gets an exact copy of that workspace, including any uncommitted file changes and the UI layout.

See

* [Creating reproducibles for any programming language](https://www.gitpod.io/blog/workspace-snapshots)

### Sustainable Node.js development with only a browser

See the article 

[Sustainable Node.js development with only a browser](https://www.gitpod.io/blog/node-js-development)


### Oferta para Estudiantes (2023)

::: danger Cambios en la oferta para estudiantes (2023)
Desafortunadamente, la oferta para estudiantes ha cambiado. GitPod ya no se ofrece como parte del GitHub Student Developer Pack.

En el blog de GitPod de 8 dic 2022 [Introducing workspace classes and flexible pricing](https://www.gitpod.io/blog/introducing-workspace-classes-and-flexible-pricing#gitpod-for-startups-students-and-open-source)
dice:

> <a href="/for/education">Students and educators</a> are encouraged to check out the generous new free and paid offerings described above. **Our pricing plans which require student verification have been discontinued**. Existing paid student plans will keep working.

* [GitHub Student Developer Pack](https://www.gitpod.io/github-student-developer-pack)
:::

###  Oferta Plan Personal (2021) Profesores

En esta URL [https://gitpod.io/plans](https://gitpod.io/plans)
se puede solicitar un upgrade al plan "personal"  que permite acceder a repositorios privados si eres un miembro de una comunidad educativa. No he tenido que introducir tarjetas.

**Importante**: Cuando rellenes la solicitud ¡El campo VAT déjalo vacío!

Lo que pasa (Abril 2021) es que GitPod está siendo ofertado como parte del [GitHub teachers' toolbox](https://education.github.com/toolbox). Por tanto, si  tienes actualizado tu GitHub Toolbox, creo que tanto los profesores como los alumnos tienen acceso a repos privados y a la nube proveída por GitPod.





![](/images/gitpod/8-horas-100-euros.png)


![teacher-coupon](/images/gitpod/teacher-coupon.png)

**Está limitada a 100 horas de uso por mes**:

* [100 horas](https://www.gitpod.io/pricing)
* Repositorios privados



En el ejemplo se ve los apuntes de PL (un repo público usando Jekyll) siendo editado con VSCode:

![apuntes-pl-gitpod](/images/gitpod/apuntes-pl-gitpod.png)

todo funciona bien.

Con este plan es posible acceder a repos privados. 
En el repo en GitHub aparece un nuevo botón verde con etiqueta "GitPod". Obsérvese que el repo es privado:

![boton-gitpod-en-repo-privado](/images/gitpod/boton-gitpod-en-repo-privado.png)    

Cuando le damos  al botón "GitPod" por primera vez es posible que nos salga un mensaje de error:

![autorizar-gitpod-a-organizacion.png 8-horas-100-euros](/images/gitpod/autorizar-gitpod-a-organizacion.png)

Le damos los permisos adecuados:

![gitpos-request-permissions](/images/gitpod/gitpos-request-permissions.png)   

![grant-access](/images/gitpod/grant-access.png)                    

y ya podemos editar nuestros repos privados.


### Drawbacks according to Pattacini

> Gitpod is fantastic but comes with some constraints that may affect yours and your students’ work:

> Obviously, you’d need to learn how to deal with Docker files and do some preliminary tests on your side. Getting accustomed to Docker might take some time :hourglass_flowing_sand:

> In a Gitpod workspace, the user has no sudo credentials. This is understandable and represents good practice, but sometimes it’d be convenient to install packages straight away from the console without the burden of adjusting the Dockerfile once more.

Pero en otro post posterior (Feb 25 2021) comenta:

> Just wanted to tell you that Gipod has been growing up tremendously as well as awesomely and, among the latest advancements it provides, we have now root access

> Gitpod is free only for public GitHub repositories. This is ok for public assignments but could be a hitch for private ones. An easy workaround could be to ask students to clone their private repositories only after the workspace is ready.

Esto se resuelve como he comentado

> There’s **the threshold of 100 hours/month per user**. Quite reasonable, but much depends on your classroom payload.
When you share a running workspace, you’ll share also your access to GitHub, which might not be desirable! This is a serious inconvenient during remote technical interviews, for example.

> Finally, don’t expect to have quantum computers available from free Cloud IDE’s services. After all, there’s a trade-off and resources are limited (e.g. no GPU), even though Gitpod seems quite generous in this sense.

### Docker Images

Si la [imagen](https://github.com/gitpod-io/workspace-images) por defecto no se adapta a lo que quieres
puedes [configurarla](https://www.gitpod.io/docs/config-docker)

Véase [Docker in Gitpod](https://www.gitpod.io/blog/docker-in-gitpod)

### Self Hosted

Gitpod, just as you know it from [gitpod.io](https://gitpod.io), can be deployed and operated on your own infrastructure. 
It supports different 

* cloud providers, 
* self-managed Kubernetes clusters, 
* corporate firewalls, and even 
* off-grid / air-gapped networks.

* [Gitpod Self-Hosted](https://www.gitpod.io/docs/self-hosted/latest/self-hosted)

You can find all configuration templates and installation scripts in the Gitpod repository:

<https://github.com/gitpod-io/gitpod>

If you already have a Kubernetes cluster, or don’t want/cannot use AWS or GCP, please follow the generic guide:

*   [Install Gitpod on Kubernetes](https://www.gitpod.io/docs/self-hosted/0.4.0/install/install-on-kubernetes/)

### Referencias

* [The benefits of integrating Docker and Cloud IDE’s in the GitHub Classroom workflow](https://education.github.community/t/the-benefits-of-integrating-docker-and-cloud-ides-in-the-github-classroom-workflow/40724) by Ugo Pattacini
* [Introduction to Gitpod](https://www.gitpod.io/docs)
* [GitPod For Schools, Universities, and Coding Bootcamps](https://www.gitpod.io/education)
* [A Beginner’s Guide to Understanding and Building Docker Images](https://jfrog.com/knowledge-base/a-beginners-guide-to-understanding-and-building-docker-images/)
* [Config Docker for GitPod](https://www.gitpod.io/docs/config-docker)
* [Docker in gitpod](https://www.gitpod.io/blog/docker-in-gitpod)
