import c3 from 'c3';

const countUsers = (postsData, usersData) => {
    var types = {};
    postsData.forEach((item) => {
        var index = item["userId"];

        if (!types[index]) {
            types[index] = [index, 1];
        } else {
            types[index][1] += 1;
        }
    })
    var usersAndPosts = []
    usersData.forEach((item) => {
        for (let i = 0; i < Object.keys(types).length+1; i++) {
            if(types[i] && (item.id === types[i][0])){
                types[i][0] = item.name;
                usersAndPosts.push(types[i])
            }
        }
    })

    return usersAndPosts;
}

export const pieChart = (postsData, usersData, target) => {
    var data = countUsers(postsData, usersData)
    c3.generate({
        data: {
            columns: data,
            bindto: target,
            type: 'pie',
        },
        legend: {
            show: true,
            position: 'right',
            item: {
                onclick: function () { }
        }

        }
    });

} 