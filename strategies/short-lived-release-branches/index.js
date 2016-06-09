var graphConfig = new GitGraph.Template({
    branch: {
        color: "#000000",
        lineWidth: 3,
        spacingX: 60,
        mergeStyle: "straight",
        showLabel: true,                // display branch names on graph
        labelFont: "normal 10pt Arial"
    },
    commit: {
        spacingY: -30,
        dot: {
            size: 8,
            strokeColor: "#000000",
            strokeWidth: 4
        },
        tag: {
            font: "normal 10pt Arial",
            color: "yellow"
        },
        message: {
            color: "black",
            font: "normal 12pt Arial",
            displayAuthor: false,
            displayBranch: false,
            displayHash: false,
        }
    },
    arrow: {
        size: 8,
        offset: 3
    }
});

var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "horizontal",
  author: "Shashank <shashankteotia@gmail.com>",
};

var bugfixCommit = {
  messageAuthorDisplay:false,
  messageBranchDisplay:false,
  messageHashDisplay:false,
  message:"Bug fix commit(s)"
};

var stablizationCommit = {
  messageAuthorDisplay:false,
  messageBranchDisplay:false,
  messageHashDisplay:false,
  message:"Release stablization commit(s)"
};

// You can manually fix columns to control the display.
var featureCol = 0;
var developCol = 1;
var releaseCol = 2;
var supportCol = 3;
var masterCol = 4;
var masterfeatureCol = 5;

var gitgraph = new GitGraph(config);

var master = gitgraph.branch({name:"master", column:masterCol});
var b_1_0_0 = gitgraph.branch({parentBranch:master, name: "1.0.0", column:developCol});
master.commit({messageDisplay:false}).merge(b_1_0_0, {messageDisplay:false});
b_1_0_0.commit({messageDisplay:false});

var feature1 = gitgraph.branch({parentBranch:b_1_0_0, name:"feature/1", column:featureCol});
feature1.commit("A feature to go into v1.0.0").commit({messageDisplay:false});
feature1.merge(b_1_0_0);

var feature2 = gitgraph.branch({parentBranch:b_1_0_0, name:"feature/2", column:featureCol});
feature2.commit("Another feature to go into v1.0.0").commit({messageDisplay:false});
feature2.merge(b_1_0_0);

// var release_100 = gitgraph.branch({parentBranch: develop, name: "release/v1.0.0", column:releaseCol});
// release_100.commit({message:"Start v1.0.0-rc Release Candidate builds",tag:"v1.0.0-rc",tagColor:'gray'});
// b_1_0_0.commit({message:"Start v1.0.0-rc Release Candidate builds",tag:"v1.0.0-rc",tagColor:'gray'});

// develop.commit({messageDisplay:false});
master.commit({messageDisplay:false});

// release_100.commit(stablizationCommit);
// release_100.merge(develop).merge(master, {dotStrokeWidth: 10, message: "Release v1.0.0 tagged",tag:"v1.0.0"});
b_1_0_0.commit({dotColor:"yellow",dotStrokeWidth: 10, message: "Release v1.0.0 tagged",tag:"v1.0.0"});
b_1_0_0.merge(master, {dotStrokeWidth: 5, message: "Release v1.0.0 merged"});

// var support_10x = gitgraph.branch({parentBranch: master, name: "support/v1.0.x", column:supportCol});
// support_10x.commit({message:"Start v1.0.1-rc Release Candidate builds",tag:"v1.0.1-rc",tagColor:'gray'}).commit(bugfixCommit);
var b_1_0_1 = gitgraph.branch({parentBranch: b_1_0_0, name: "1.0.1", column:supportCol});
b_1_0_1.commit(bugfixCommit);

// var feature3 = gitgraph.branch({parentBranch:develop, name:"feature/3", column:featureCol});
// develop.commit({messageDisplay:false});
// feature3.commit("A feature to go into v1.1.0").commit({messageDisplay:false});
// feature3.merge(develop);
var feature3 = gitgraph.branch({parentBranch:master, name:"feature/3", column:masterfeatureCol});
master.commit({messageDisplay:false});
feature3.commit("A feature to go into v1.1.0").commit({messageDisplay:false});
feature3.merge(master);

// support_10x.commit({dotStrokeWidth: 10, message: "Release v1.0.1 tagged",tag:"v1.0.1"}).merge(develop);
b_1_0_1.commit({dotColor:"yellow",dotStrokeWidth: 10, message: "Release v1.0.1 tagged",tag:"v1.0.1"}).merge(master);

// // develop.commit({messageDisplay:false});
master.commit({messageDisplay:false});

// // support_10x.commit({message:"Start v1.0.2-rc Release Candidate builds",tag:"v1.0.2-rc",tagColor:'gray'})
// // support_10x.commit(bugfixCommit).commit({dotStrokeWidth: 10, message: "Release v1.0.2 tagged",tag:'v1.0.2'});
// // support_10x.merge(develop);
var b_1_0_2 = gitgraph.branch({parentBranch: b_1_0_1, name: "1.0.2", column:supportCol});
// // support_1_0_1.commit({message:"Start v1.0.2-rc Release Candidate builds",tag:"v1.0.2-rc",tagColor:'gray'})
b_1_0_2.commit({messageDisplay:false});
b_1_0_2.commit(bugfixCommit).commit({dotColor:"yellow",dotStrokeWidth: 10, message: "Release v1.0.2 tagged",tag:'v1.0.2'});
b_1_0_2.merge(master);

master.commit({messageDisplay:false});

// var release_110 = gitgraph.branch({parentBranch: develop, name: "release/v1.1.0", column:releaseCol});
// release_110.commit({message:"Start v1.1.0-rc Release Candidate builds",tag:"v1.1.0-rc",tagColor:'gray'})
// release_110.commit(stablizationCommit);
// release_110.merge(develop).merge(master, {dotStrokeWidth: 10, message: "Release v1.1.0 tagged",tag:"v1.1.0"});
var b_1_1_0 = gitgraph.branch({parentBranch: master, name: "1.1.0", column:developCol});
b_1_1_0.commit({message:"Start v1.1.0-rc Release Candidate builds"})
b_1_1_0.commit(stablizationCommit);
b_1_1_0.commit({dotColor:"yellow",dotStrokeWidth: 10, message: "Release v1.1.0 tagged",tag:"v1.1.0"});
b_1_1_0.merge(master);

// var support_11x = gitgraph.branch({parentBranch: master, name: "support/v1.1.x", column:supportCol});
// support_11x.commit({message:"Start v1.1.1-rc Release Candidate builds",tag:"v1.1.1-rc",tagColor:'gray'})
// support_11x.commit(bugfixCommit).commit({dotStrokeWidth: 10, message: "Release v1.1.1 tagged",tag:"v1.1.1"});
// support_11x.merge(develop);
// develop.commit({messageDisplay:false});
var b_1_1_1 = gitgraph.branch({parentBranch: b_1_1_0, name: "1.1.1", column:supportCol});
b_1_1_1.commit({message:"Start v1.1.1-rc Release Candidate builds"})
b_1_1_1.commit(bugfixCommit).commit({dotColor:"yellow",dotStrokeWidth: 10, message: "Release v1.1.1 tagged",tag:"v1.1.1"});
b_1_1_1.merge(master);
master.commit({messageDisplay:false});

// var feature4 = gitgraph.branch({parentBranch:develop, name:"feature/4", column:featureCol});
// develop.commit({messageDisplay:false});
// feature4.commit("A feature to go into v1.2.0").commit({messageDisplay:false});
// feature4.merge(develop);
var feature4 = gitgraph.branch({parentBranch:master, name:"feature/4", column:masterfeatureCol});
master.commit({messageDisplay:false});
feature4.commit("A feature to go into v1.2.0").commit({messageDisplay:false});
feature4.merge(master);

// support_11x.commit({message:"Start v1.1.2-rc Release Candidate builds",tag:"v1.1.2-rc",tagColor:'gray'})
// support_11x.commit(bugfixCommit).commit({dotStrokeWidth: 10, message: "Release v1.1.2",tag:"v1.1.2"});
// support_11x.merge(develop);
// develop.commit({messageDisplay:false});

var b_1_1_2 = gitgraph.branch({parentBranch: b_1_1_1, name: "1.1.2", column:supportCol});
b_1_1_2.commit({messageDisplay:false});
b_1_1_2.commit({messageDisplay:false}).commit({dotColor:"yellow",dotStrokeWidth: 10, message: "Release v1.1.2",tag:"v1.1.2"});;
b_1_1_2.merge(master);
master.commit({messageDisplay:false});

var feature5 = gitgraph.branch({parentBranch:master, name:"feature/5", column:masterfeatureCol});
master.commit({messageDisplay:false});
feature5.commit("Another feature to go into v1.2.0").commit({messageDisplay:false});


master.commit({messageDisplay:false});
var b_1_2_0 = gitgraph.branch({parentBranch: master, name: "1.2.0", column:developCol});
b_1_2_0.commit({message:"Start v1.2.0-rc Release Candidate builds"})
feature5.merge(master);



// support_11x.commit({message:"Start v1.1.3-rc Release Candidate builds",tag:"v1.1.3-rc",tagColor:'gray'})
// support_11x.commit(bugfixCommit).commit({dotStrokeWidth: 10, message: "Release v1.1.3 tagged",tag:"v1.1.3"});
// support_11x.merge(develop);
// develop.commit({messageDisplay:false});
var b_1_1_3 = gitgraph.branch({parentBranch: b_1_1_2, name: "1.1.3", column:supportCol});
b_1_1_3.commit({message:"Start v1.1.3-rc Release Candidate builds"})
b_1_1_3.commit(bugfixCommit).commit({dotColor:"yellow",dotStrokeWidth: 10, message: "Release v1.1.3 tagged",tag:"v1.1.3"});
b_1_1_3.merge(master);
master.commit({messageDisplay:false});

// var release_120 = gitgraph.branch({parentBranch: develop, name: "release/v1.2.0", column:releaseCol});
// release_120.commit({message:"Start v1.2.0-rc Release Candidate builds",tag:"v1.2.0-rc",tagColor:'gray'})
// release_120.commit(stablizationCommit);
// release_120.merge(develop).merge(master, {dotStrokeWidth: 10, message: "Release v1.2.0 tagged",tag:"v1.2.0"});
// develop.commit({messageDisplay:false});
b_1_2_0.commit(stablizationCommit);
b_1_2_0.commit({dotColor:"yellow",dotStrokeWidth: 10, message: "Release v1.2.0 tagged",tag:"v1.2.0"});
b_1_2_0.merge(master)
master.commit({messageDisplay:false});
