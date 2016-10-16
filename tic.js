
var ai='x';
var player='o';
var tic=[[0,0,0],[0,0,0],[0,0,0]];
var min=1000;
var max=-1000;

//判断哪方获胜
function winer(){
    if(getLines(tic,1)){
        return 1;
    }else if(getLines(tic,-1)){
        return -1;
    }else{
        var flag=1;
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                if(tic[i][j]===0){
                    flag=0;
                }
            }
        }
        if(flag===1){
            return 2;
        }
    }
    return 0;
}
//获取线的数目
function getLines(tic,rotation){
    var lines=0;
    var sum=0;
    for(var i=0;i<3;i++){
        sum=0;
        for(var j=0;j<3;j++){
            sum+=tic[i][j];
        }
        if(sum===rotation*3){
            lines++;
        }
    }
    for(var n=0;n<3;n++){
        sum=0;
        for(var m=0;m<3;m++){
            sum+=tic[m][n];
        }
        if(sum===rotation*3){
            lines++;
        }
    }
    if(tic[0][0]+tic[1][1]+tic[2][2]===rotation*3){
        lines++;
    }
    if(tic[0][2]+tic[1][1]+tic[2][0]===rotation*3){
        lines++;
    }
    return lines;
}

//极大极小算法
function miniMax(deep){
    var value;
    var maxx=0;
    var maxy=0;
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(tic[i][j]!=0){
                if(i==2&&j==2){
                    return [maxx,maxy]
                }
                continue;
            }
            if(deep===2){
                tic[i][j]=-1;
                if(getLines(tic,-1)){
                    maxx=i;
                    maxy=j;
                    return [i,j]
                }
                min=1000;
                miniMax(1);
                value=min;
                if(value>max){
                    max=value;
                    maxx=i;
                    maxy=j;
                }
                tic[i][j]=0;
            }

            if(deep===1){
                tic[i][j]=1;
                if(getLines(tic,1)){
                    min=-1000;
                    tic[i][j]=0;
                    return;
                }
                value=assess();
                if(value<min){
                    min=value;
                }
                tic[i][j]=0;
            }
            if(i===2&&j===2){
                return [maxx,maxy];
            }
        }
    }
}

//评估
function assess(){
    console.log(tic);
    var aiArr=[[0,0,0],[0,0,0],[0,0,0]];
    var playerArr=[[0,0,0],[0,0,0],[0,0,0]];
    for(var i=0;i<3;i++) {
        for (var j = 0; j < 3; j++) {
            if(tic[i][j]===0){
                aiArr[i][j]=-1;
                playerArr[i][j]=1;
            }else{
                aiArr[i][j]=tic[i][j];
                playerArr[i][j]=tic[i][j];
            }
        }
    }
    /*for(var i=0;i<3;i++) {
     for (var j = 0; j < 3; j++) {
     if(tic[i][j]===0){
     playerArr[i][j]=1;
     }else{
     playerArr[i][j]=tic[i][j];
     }
     }
     }*/
    return getLines(aiArr,-1)-getLines(playerArr,1);
}

$(function(){
    $('#myModal').modal({
        keyboard:false
    });
    $('#restart').on('click',function(){
        location.href=location.href;
    });
    $('.modal-footer').find('.btn').on('click',function(){
        player=$(this).html();
        ai=$(this).siblings().html();
        num1=Math.floor(Math.random()*3);
        num2=Math.floor(Math.random()*3);
        tic[num1][num2]=-1;
        $('#'+num1+'-'+num2).html(ai);
    });
    $('td').on('click',function(){
        var i=$(this).attr('id').split('-')[0];
        var j=$(this).attr('id').split('-')[1];
        if(tic[i][j]!==0){
            alert('此处不能下棋');
        }else{
            tic[i][j]=1;
            $('#'+i+'-'+j).html(player);
            //电脑
            max=-1000;
            var aiWay=miniMax(2);
            var x=aiWay[0];
            var y=aiWay[1];
            tic[x][y]=-1;
            $('#'+x+'-'+y).html(ai);
            setTimeout(function(){
                if(winer()===-1){
                    alert('你输了');
                }else if(winer()===1){
                    alert('你赢了');
                }else if(winer()===2){
                    alert('平局');
                }
            },10)
        }
    });
});