# GitHub Releases

GitHub Releases is a way to create a release to package software, along with release notes and links to binary files, for other people to use.

Releases are based on [Git tags](https://git-scm.com/book/en/Git-Basics-Tagging), which mark a specific point in your repository's history. A tag date may be different than a release date since they can be created at different times. For more information about viewing your existing tags, see "[Viewing your repository's releases and tags](https://help.github.com/en/github/administering-a-repository/viewing-your-repositorys-releases-and-tags).

Releases are ordered by a tag's date in the following way:

* If it's an <a href="https://git-scm.com/book/en/v2/Git-Basics-Tagging#_annotated_tags" target="_blank">annotated tag, the tag object's date is used</a>.
* If it's a <a href="https://git-scm.com/book/en/v2/Git-Basics-Tagging#_lightweight_tags" target="_blank">lightweight tag</a>, then the commit object's date is used.

## The release Event

A GitHub event with the name **release** is triggered when a release is 

* published, 
* unpublished, 
* created, 
* edited, 
* deleted, or 
* prereleased.

See [GitHub Webhooks](https://developer.github.com/webhooks/).

## Creating Releases Using the GitHub Web App

See https://docs.github.com/en/repositories/releasing-projects-on-github

## References

* See more at [Managing releases in a repository](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release)
* See also <a name="myfootnote1">1</a>: (Paragraph borrowed from [What exactly is a Release in GitHub?](https://stackoverflow.com/questions/33551505/what-exactly-is-a-release-in-github))
* See [GitHub Webhooks](https://developer.github.com/webhooks/).
