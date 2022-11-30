# Note App

Stack:

.NET + React.js + MongoDB

## Recommended IDE(s)

* Visual Studio
* Rider
* Visual Studio Code

## Run Command (CLI) - Development Mode

```bash
dotnet run --project .\NoteApp\ --launch-profile NoteApp
```

## Deployment Pipelines

### General

```mermaid
graph LR;
 a[Github] --> b[Azure DevOps];
 b --> c[AWS Elastic Beanstalk];
```

### Azure DevOps

```mermaid
graph TD;
 1[dotnet restore] --> a;
 a["dotnet publish (zip)"] --> b[Upload Artifact];
 b --> c[Beanstalk Task - Upload zip];
```

## License

MIT

```markdown
The MIT License (MIT)

Copyright © 2022 Bervianto Leo Pratama

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```