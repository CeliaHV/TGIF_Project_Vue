var app = new Vue({
    el: '#app',
    data: {
        members: [],
        leastAttendance: [],
        mostAttendance: [],
        leastAttendanceParty: [],
        mostAttendanceParty: [],
        NumOfDemocrats: 0,
        NumOfRepublicans: 0,
        NumOfIndependents: 0,
        NumTotal: 0,
        AverageVotesWithPartyForDemocrats: 0,
        AverageVotesWithPartyRepublicans: 0,
        AverageVotesWithPartyIndependents: 0,
        
    },
    
    methods: {
        totalMembers: function () {
        var members = this.members;
    for (i = 0; i < this.members.length; i++) {
        if (this.members[i]) {
            this.NumTotal++;}
            }
        },
        
        numMembers: function () {
    for (i = 0; i < this.members.length; i++) {
        if (this.members[i].party == "D") {
            this.NumOfDemocrats++;
        }
        if (this.members[i].party == "R") {
            this.NumOfRepublicans++;
        }  
        if (this.members[i].party == "I") {
            this.NumOfIndependents++;
                }  
            }
        },
        
        voteswParty: function () {
             for (i = 0; i < this.members.length; i++) {
        if (this.members[i].party == "D") {
            this.AverageVotesWithPartyForDemocrats += (this.members[i].votes_with_party_pct) / this.NumTotal
            }
        if (this.members[i].party == "R") {
            this.AverageVotesWithPartyRepublicans += (this.members[i].votes_with_party_pct) / this.NumTotal
            }
        if (this.members[i].party == "I") {
            this.AverageVotesWithPartyIndependents += (this.members[i].votes_with_party_pct) / this.NumTotal
                }  
            }
        },
        
        tenPCT: function (key, least) {
            var sortedArray
            var array = this.members
            var pct = array.length/10
            if(least){
                sortedArray = [...array].sort(function(a,b){return a[key] - b[key]})
            } else {
               sortedArray = [...array].sort(function(a,b){return b[key] - a[key]}) 
            }

            var aux = []
            i = 0

            while(i < pct){
                aux.push(sortedArray[i])
                if(i > 0 && sortedArray[i][key] == sortedArray[i - 1][key]){
                    pct ++
                }
                i++
            }
            return aux
        },
        
    }
                  
                  
});

    
   
function start(url) {

    var fetchConfig =
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "X-API-Key": 'FzcR2MOc08mLWCMeMsxbfJWq5Jbue4Oe3PYDQuQU'
            })
        }).then(function (response) {
            if (response.ok)
                return response.json();
        }).then(function (json) {
            app.members = json.results[0].members;
            app.numMembers()
            app.totalMembers()
            app.voteswParty()
            })
        .catch(function (error) {
            console.log(error);
        })
}

if (window.location.pathname.indexOf('attendance_senate.html') != -1|| window.location.pathname.indexOf('loyalty_senate.html') != -1) {
    start("https://api.propublica.org/congress/v1/113/senate/members.json");
} else {
    start("https://api.propublica.org/congress/v1/113/house/members.json");
}

