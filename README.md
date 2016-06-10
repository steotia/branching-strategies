Crediting visualizations and the gitflow example to the awesome [gitgraph.js](https://github.com/nicoespeon/gitgraph.js) Copyright (c) 2013 Nicolas CARLO and Fabien BERNARD

Credited to my discussion with [Gaurav Singhania](https://github.com/gauravsinghania) and [Kiran G](https://github.com/kirang20)

# Continuous Integration Improvements
## Git Branching Strategies
In a multi-team x multi-repo x monthly release scenario, we need a single accepted strategy which helps in:

1. **managing daily operations:** checking in code, preparing for releases and hot fixes should be simple and the version histories should not become unmanageable after a few iterations of monthly releases.

2. **identifying release versions:** have a single tagging mechanism across repos, so we know that if someone mentions v1.0.2, across teams it is simple to know the state of Git for that release.

3. **simplifying deployment:** It is easy to have a standardised deployment protocol if all teams follow the same branching model.

This document showcases following commonly accepted branching patterns and proposes one for discussion and acceptance.

### Minimal branching network
![minimal-branching-network](https://raw.githubusercontent.com/steotia/branching-strategies/master/assets/images/minimal-branching-network.png)

versus

### Gitflow network
![gitflow-network](https://raw.githubusercontent.com/steotia/branching-strategies/master/assets/images/gitflow-network.png)

I have tried to keep the development path same in the comparison so that comparison is as faithful as possible.

### Explaining Minimal Branching (proposed)

#### Primary Goal
This branching model stresses on having lesser and short lived branches. There is lesser chances of merge hell and is simpler to follow for individual teams than GitFlow pattern. Version Histories are cleaner and even though it feels less organised, the simplicity pays back over time.

#### Sample Network

![minimal-branching-network](https://raw.githubusercontent.com/steotia/branching-strategies/master/assets/images/minimal-branching-network.png)
Click for bigger image: [minimal-branching-network](https://raw.githubusercontent.com/steotia/branching-strategies/master/assets/images/minimal-branching-network.png)
Check out [changelog](https://github.com/steotia/branching-strategies/blob/master/strategies/short-lived-release-branches/index.js) to know how this history was created.

#### First Observations
* No long lived branches.
* There is only one eternal branch - master
* Development on all branches, including master. 
* All branches merging into master.
* No merging from master into branches (except feature branches on master).
* Possibly resulting in 3 CI pipelines: (1) master (2) release (3) hot-fixes

#### Guides
* **CREATE a Release branch** from master with x.y.z semantics when ready to test the release. The release branch will have a dedicated CI Pipeline and Environment to test. This is in addition to have a CI Pipeline for master. 

**IMPORTANT**: x.y.z = major.minor.**hot-fix** and **NOT** major.minor.**build-version**. Remember, that the branch name has nothing to do with the build pipeline. The Build Pipeline will of course monitor this branch and perform build promotion on the release environment.

* **TAG the last commit** 
* **MERGE into master and DELETE the release branch AFTER production deployment**. This also means that the CI Pipeline and environments are now harvested. Note that CI Pipeline and environments for master will always remain online.

IFF a hot fix is required on Production,
* **CREATE a release branch from the appropriate TAG** and follow the steps as for any release branch. If required, create a CI Pipeline for the hot-fix branch.

Thats it!

### GitFlow Branching
#### Primary Goal
Having a clearer mental model with extremely separate lanes of development.

#### Sample Network
![gitflow-network](https://raw.githubusercontent.com/steotia/branching-strategies/master/assets/images/gitflow-network.png)
Click for bigger image: [gitflow-network](https://raw.githubusercontent.com/steotia/branching-strategies/master/assets/images/gitflow-network.png)

#### First Observations
* 2 permanent branches - master and develop.
* master is almost irrelevant.
* higher chances of making mistakes in merging because of more rules about branching and existence of long lived branches.
* needlessly complex for all multiple repos to do this.

#### Guides
* [Just too many rules](http://nvie.com/posts/a-successful-git-branching-model/)
