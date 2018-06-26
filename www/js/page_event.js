// This is a JavaScript file
document.addEventListener('init', function(event) {
      var page = event.target;
      var ncmb = new NCMB("110bd92fd08b667727f46a321bb903bacc49babf679332505f8ce751c1c38ce4","19fff4af2112fbfc38b048dae80f6c5c629732e81ce1848622659c12d70c1b7b");

      //var titleElement = document.querySelector('#toolbar-title');

      if (page.matches('#first-page')) {
       // titleElement.innerHTML = 'My app - ホームページ';
        var target_time;
        var sport_time_count=0;

        ons.ready(function() { 
            var show_target_time = parseInt(localStorage.getItem("TargetTime"))/3600;
            page.querySelector('div .percent').innerHTML = show_target_time.toFixed(1)+"h";
            circle();
        });
        page.querySelector('#target_prompt').onclick =　function disp_prompt() {  
          sport_time_count=0;
          var time = prompt("目標の運動時間(時単位)","10")*3600; // 弹出input框 
          /*if (localStorage.getItem("sportKey) >= localStorage.getItem("targetKey")){
                localStorage.removeItem("targetKey");
                localStorage.setItem("targetKey",time);
          } else {
                page.querySelector('div .percent').innerHTML = localStorage.getItem("targetKey");
                target_time=time;
          }
          */
          localStorage.setItem("TargetTime",time); 
          localStorage.setItem("SportTime_Count",sport_time_count);
          var show_target_time = parseInt(localStorage.getItem("TargetTime"))/3600;
          page.querySelector('div .percent').innerHTML = show_target_time.toFixed(1)+"h";
          circle();
          //return target_time;
        } 
        
        var intervalId;
        var i = 0;
        var count=0;
        page.querySelector('#timer_start').onclick =　function startTime(){
          var hour = document.getElementById("timer_hour");
          var minute = document.getElementById("timer_minute");
          var second = document.getElementById("timer_second");
          var buttonEle = document.getElementById("timer_start");

          page.querySelector('#timer_clear').onclick =　function clearTime(){
            count = 0;
            hour.innerHTML="00 ";
            minute.innerHTML="00 ";
            second.innerHTML="00 ";
            localStorage.setItem("SportTime",0);

          }


          if(i%2==0){
            buttonEle.innerHTML="タンマ";
            intervalId = setInterval(function(){
                count += 1;
                var thehour=parseInt(count/360000);
                var theminute=parseInt(count/6000%60);
                var thesecond=parseInt(count/100%60);

                if(thehour>=10){
                  hour.innerHTML=thehour+" ";
                }　else　{
                      hour.innerHTML="0"+thehour+" ";
                }

                if(theminute>=10){
                  minute.innerHTML=theminute+" ";
                }　else　{
                      minute.innerHTML="0"+theminute+" ";
                }

                if(thesecond>=10){
                  second.innerHTML=thesecond+" ";
                }　else　{
                      second.innerHTML="0"+thesecond+"  ";
                }
            },10)
          }　else　{
                buttonEle.innerHTML="計時開始";
                localStorage.removeItem("SportTime");
                localStorage.setItem("SportTime",count/100);
                clearInterval(intervalId);
          }
          i++;
      }
      //記録
      page.querySelector('#timer_send').onclick =　function saveMemo() {
        var timer_sport = document.getElementById("timer_sport").value;
        var time_input = document.getElementById("timer_input").value*3600;
        var timer_memo = document.getElementById("timer_memo").value;
        var sport_time = parseInt(localStorage.getItem("SportTime"));
        var target_time = parseInt(localStorage.getItem("TargetTime"));

        sport_timeA=sport_time + time_input;
        sport_time_count = sport_time_count + sport_timeA;
        localStorage.setItem("SportTime_Count",sport_time_count);
        var rest_time = (target_time - sport_time_count)/3600;
        if (sport_time_count < target_time){
          page.querySelector('div .percent').innerHTML = rest_time.toFixed(1)+"h";
          page.querySelector('ons-list-item .show_Vue').innerHTML += timer_sport+": "+(sport_timeA/60).toFixed(0)+"分    Memo:"+timer_memo+"<br />";
          circle();
        }else{
          circle();
          alert("目標達成!!!");
          
          var timeall = parseInt(localStorage.getItem("SportTime_Count_ALL"));
          timeall = timeall + sport_time_count;
          localStorage.setItem("SportTime_Count_ALL",timeall);
          
          page.querySelector('div .percent').innerHTML = rest_time.toFixed(1)+"h";
          page.querySelector('ons-list-item .show_Vue').innerHTML += timer_sport+": "+(sport_timeA/60).toFixed(0)+"分    Memo:"+timer_memo+"<br />";
          var tank = tank + 1;
          localStorage.setItem("Tank",tank);
          localStorage.removeItem("TargetTime");
          localStorage.removeItem("SportTime_Count");
          sport_time_count = 0;
          
        }
      }
      } else if (page.matches('#second-page')) {
        //titleElement.innerHTML = 'My app - 個人ページ';AddUserdata.html
        
          ons.ready(function() { 
            //localStorage.clear();
            var key1,key2;
            var LoginUsername = localStorage.getItem("LoginUsername");
            var LoginEmail = localStorage.getItem("LoginEmail");
            if(LoginUsername == undefined && LoginEmail == undefined){
              var mychar1 = document.getElementById('signup').style.display="block";
              var mychar2 = document.getElementById('logout').style.display="none";
            } else {
              var mychar1 = document.getElementById('signup').style.display="none";
              var mychar2 = document.getElementById('logout').style.display="block";
              if (LoginUsername == undefined ){
                key1 = "mailAddress";
                key2 = LoginEmail;

              } else if(LoginEmail == undefined){
                key1 = "userName";
                key2 = LoginUsername;
              }
            }
          
            ncmb.User.equalTo(key1, key2)
                     .fetchAll()
                     .then(function(results){
                            for (var i = 0; i < results.length; i++) {
                              var object = results[i];
                              var username = object.get("userName");
                              var sex = object.get("sex");
                              var birthday = object.get("Birthday");
                              var height = object.get("height");
                              var weight = object.get("weight");
                            }
                            var b_year = birthday.substr(0, 4);
                            var b_monday =  birthday.substr(5, 2) + birthday.substr(8, 2);
                            var date = new Date();
                            var n_year = date.getFullYear(); 
                            var n_month = date.getMonth()+1;
                            var n_date = date.getDate();
                            var n_monday = Appendzero(n_month) + Appendzero(n_date);
                            var age = n_year - b_year - 1;

                            if ( n_monday >= b_monday){
                              age = age + 1
                            }

                            if(sex == "男性"){
                              var bmr =10*weight + 6.25*height - 5*age + 5;
                            }else{
                              var bmr =10*weight + 6.25*height  - (5*age + 161);
                            }

                            var bmi=weight/(height*height/10000);
               
                            var message = "あなたは";
                            if(bmi < 18.5) {
                              message += "低体重(痩せ型)です。";
                              message1 = "日頃から「散歩」、「早く歩く」、「乗り物やエレベータを使わずに歩くようにする」など意識的に身体を動かしましょう";
                              message2 = "週2回以上、1回1時間以上の息が少しはずむ程度の運動を習慣に";
                              message3 = "ゴルフ、ターゲットバードゴルフ、ミニゴルフなど";
                            } else if (bmi >= 18.5 && bmi < 25) {
                              message += "普通体重です。";
                              message1 = "日頃から「散歩」、「早く歩く」、「乗り物やエレベータを使わずに歩くようにする」など意識的に身体を動かしましょう";
                              message2 = "週2回以上、1回30分以上の息が少しはずむ程度の運動を習慣に";
                              message3 = "1日平均1万歩以上歩くことを目標に、すべて運動もいい、ジョギング、エアロビクスなど";
                            } else if (bmi >= 25 && bmi < 30) {
                              message += "肥満(1度)です。";
                              message1 = "日頃から「散歩」、「乗り物やエレベータを使わずに歩くようにする」など意識的に身体を動かしましょう";
                              message2 = "週2回以上、1回1時間以上の息が少しはずむ程度の運動を習慣に";
                              message3 = "ゴルフ、ターゲットバードゴルフ、ミニゴルフなど";
                            } else if (bmi >= 30 && bmi < 35) {
                              message += "肥満(2度)です。";
                              message1 = "ダイエットの意識を持ち、健康のために運動を始める";
                              message2 = "週2回以上、1回2時間以上の息が少しはずむ程度の運動を習慣に";
                              message3 = "ハイキング、ピクニック、オリエンテーリング、キャンピングなど";
                            } else if (bmi >= 35 && bmi < 40) {
                              message += "肥満(3度)です。";
                              message1 = "ダイエットの意識を持ち、健康のために運動を始める";
                              message2 = "週2回以上、1回1時間以上の息が少しはずむ程度の運動を習慣に";
                              message3 = "ハイキング、ピクニック、オリエンテーリング、キャンピングなど";
                            } else if (bmi >= 40) {
                              message += "肥満(4度)です。";
                              message1 = "日頃から「散歩」、健康など意識的に身体を動かしましょう";
                              message2 = "週2回以上、1回30分以上の息が少しはずむ程度の運動を習慣に";
                              message3 = "日頃から「散歩」、1日平均5000歩以上歩くことを目標に";
                            }
                            page.querySelector('ons-list-item .user_data1').innerHTML = username;
                            page.querySelector('ons-list-item .user_data2').innerHTML = "年齢: "+age+"　 性別: "+sex;
                            page.querySelector('ons-list-item .user_data2').innerHTML += "<br />身長: "+height+"cm 　体重: "+weight+"Kg  ";
                            page.querySelector('ons-list-item .user_data3').innerHTML += "BMI: "+Math.round(bmi*100)/100+"<br />";
                            page.querySelector('ons-list-item .user_data3').innerHTML += "基礎代謝: "+bmr+"kcl<br />";
                            page.querySelector('ons-list-item .user_data3').innerHTML += message+"<br />";
                            page.querySelector('ons-card .recommend_target1').innerHTML = message1+"<br />";
                            page.querySelector('ons-card .recommend_target2').innerHTML = message2+"<br />";
                            page.querySelector('ons-card .recommend_target3').innerHTML = message3+"<br />";

                        })
                        .catch(function(err){
                          console.log(err);
                        });

          }); 
      } else if (page.matches('#third-page')){

        var tank_number = parseInt(localStorage.getItem("Tank"));
        var sport_time_all=Math.round(parseInt(localStorage.getItem("SportTime_Count_ALL"))/3600);
        page.querySelector('div .sport_time').innerHTML =sport_time_all+"時間";
        page.querySelector('div .tank_number').innerHTML = "目標完成数: "+tank_number;
        var change_weight =0;

        if(tank_number = 0){
          var show_tank = 0;
        } else{
          var show_tank = tank_number;
        }

        if(change_weight > 0){
            var weight_text= change_weight +"kg 減少しました!";
        }else if(change_weight == 0){
                var weight_text= "変化がないです。";
              }else {
                var weight_text= "もっと頑張って!";
              }
        var calorie_all =  sport_time_all*100;
        page.querySelector('div .weight_change').innerHTML =weight_text;
        page.querySelector('div .calorie').innerHTML =calorie_all;




        var data1 = {
            labels: ["Tank1", "Tank2", "Tank3", "Tank4", "Tank5", "Tank1"],
            datasets: [
                {
                    label: "運動時間",
                    backgroundColor: ['rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                    ],
                    borderColor: [
                                      'rgba(255,99,132,1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                   ],
                    data: [sport_time_all, 0, 0, 0, 0, 0],
                    borderWidth: 1
                }
            ]
        };
        var ctx1 = document.getElementById("chart-canvas");
        
        new Chart(ctx1, {
            type: "bar",
            data: data1,
            
        });

        var data2 = {
            labels: ["サッカー", "水泳", "散歩", "〜", "〜", "〜"],
            datasets: [
                {
                    label: "運動別",
                    backgroundColor: ['rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                    ],
                    borderColor: [
                                      'rgba(255,99,132,1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                   ],
                    data: [8, 2, 11, 0, 11, 13],
                    borderWidth: 1
                }
            ]
        };
      

        var ctx2 = document.getElementById("chart-canvas2");
        new Chart(ctx2,{
            type:"doughnut",
            data:data2
        });

        page.querySelector('#reload').onclick = function() {
            document.location.reload();
        }
      
      } else if (page.matches('#AddUser')){
          
      }
    });

function Appendzero(obj)  
{  
  if(obj<10){
    return "0" +""+ obj;
  }      
  else {
    return obj; 
  } 
}  