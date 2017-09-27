# Answers

## Notice anything new in our .gitignore? There are actually multiple .gitignore files in this project. Where are they? Why might we have more than one, and how do they interact?

Added :
- Intellij+iml Patch
- Files .iml, modules.xml, /idea/misc.xml, .ipr

Deleted : 
- Gradle build, app-setting, wrapper and wrapper properties
- Ignored the .iml files as Gradle is being used
- Removed .idea/ ../ [high churn files, .xml files, workspace, task, dynamic, uiDesigner]
- Removed cmake-build-debug and mongo settings
- Removed nyc test coverage, logs, runtime data, directories corresponding to various libraries and tools
- Removed .grunt, brower_components, dependency directories, cache, history, npm pack output, yarn integrity file, dot environment file

The other multiple .gitignore files are in the server and client directories respectively.
The client/.gitignore interacts with the files that we want to ignmore at client side whereas for server/.gitignore interacts with the files that are on the server side of the project.

## Note also that there are now multiple build.gradle files as well! Why is this?

There are different build.gradle across the project for various distinct tests. For example build.gradle in the server directory runs only the server tests like (runServerTests, runAllTests nd buildExecutable) whereas the build.gradle in the client directory runs the client test like (runClient, runClientTestsAndWatch, runClientTestWithCoverage, runE2ETest and runClientTests).

## How does the navbar work in this project? Is our SparkJava server the only thing doing routing?

The nav bar is the navigation bar, usually at the top of a random html page. It contains links that directs the user to pages like /about, /[facilities etc.] for the specific website. Therefore, we can say it is where the site's main informative pages are loaded or seen from.

## What does the todo-list.service.ts do? Why is it not just done in the todo-list.component.ts?
The todo-list.service.ts sends a request to the server for either users with a specified id or just all of them.
It's not in user-list.component.ts because todo-list.service.ts is where the data is handled and it deals with the server separately. 
