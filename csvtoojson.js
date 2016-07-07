fs=require('fs')
fs.readFile('India2011.csv', 'utf8', function (err,data) {
if (err) {
   return console.log(err);
 }
var wstream = fs.createWriteStream('India2011.json');
wstream.write(JSON.stringify(csvToJson(data)));
wstream.end();
});
function csvToJson(data)
{
var lines=data.split("\n");
var allData=[];
var x=0;
var Data1=[];
var Data2=[];
var Data4=[];
var xi=0;
for(var i=1; i<lines.length-1; i++)
{
 allData[x]=lines[i].split(',');
 Data4.push(allData[x][4]);
 Data1.push(allData[x][5]);
 Data2.push(allData[x][12]);
 x++;
}
var Data3=[];
for(var i=0;i<Data1.length;i++)
{
   var c=0;
   for(var k=0;k<=Data3.length;k++)
   {
     if(Data3[k]==Data1[i])
       c=1;
   }
   if(c==0) Data3.push(Data1[i]);
}
var Datasum=[];
for(var i=1;i<Data3.length-1;i++)
{
 var sum=0;
 for(var j=0;j<Data1.length;j++)
   if(Data3[i]==Data1[j] && Data4[j]=="Total")
     sum+=parseInt(Data2[j]);
 Datasum.push(sum);
}
var sum1=0;
var sum2=0;
var sum3=0;
for(var i=1;i<Data3.length-1;i++)
{
 if(Data3[i]==7 || Data3[i]==8 || Data3[i]==9)
   sum1+=parseInt(Datasum[i]);
 else if(Data3[i]==10 || Data3[i]==11 || Data3[i]==12 || Data3[i]==13 || Data3[i]==14)
   sum2+=parseInt(Datasum[i]);
 else if(Data3[i]==15 || Data3[i]==16 || Data3[i]==17 || Data3[i]==18 || Data3[i]==19)
   sum3+=parseInt(Datasum[i]);
}
var SumList=[];
SumList.push(parseInt(Data2[1]));
SumList.push(sum1);
SumList.push(sum2);
SumList.push(sum3);
for(var i=14;i<Datasum.length;i++)
{
 SumList.push(Datasum[i]);
}
var finalAgeList=[];
finalAgeList.push(Data3[1]);
finalAgeList.push('7-9');
finalAgeList.push('10-14');
finalAgeList.push('15-19');
for(var i=15;i<Data3.length-1;i++)
{
  finalAgeList.push(Data3[i]);
}
var myobj={};
var ObjArr=[];
for(var i=0;i<SumList.length;i++)
{
  myobj.age_group=finalAgeList[i];
  myobj.totalLiterate=SumList[i];
  ObjArr[i]=myobj;
  myobj={};
}
console.log(ObjArr);
return ObjArr;
}
