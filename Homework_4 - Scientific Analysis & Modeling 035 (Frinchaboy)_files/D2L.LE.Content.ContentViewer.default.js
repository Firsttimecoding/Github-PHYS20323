D2L.LE.ViewContent={};
D2L.LE.ViewContent.ContentViewer={OnLoad:function(orgUnitId,topicId,event,trackViewingLocation,finalizeViewingLocation,heartbeatInterval){var DownloadCallback=function(){D2L.LP.Web.UI.Rpc.ConnectObject(D2L.LP.Web.UI.Rpc.Verbs.GET,new D2L.LP.Web.Http.UrlLocation("/d2l/le/content/"+orgUnitId+"/topics/files/download/"+topicId+"/TopicDownloadConfirmed"))};D2L.LP.Web.UI.Html.Dom.AddEventListener("DocumentViewerDownload",document,DownloadCallback);var timer=new Tock({});var stagingTimer=new Tock({});var heartbeatTimer=
null;var insertLog=null;var finalizeSent=false;function Finalize(){if(finalizeSent)return;finalizeSent=true;var location=(new D2L.LP.Web.Http.UrlLocation(finalizeViewingLocation)).GetUrl().WithQueryString("time",timer.lap());D2L.LP.Web.UI.Rpc.SendBeacon(location)}D2L.LP.Web.UI.Html.Dom.AddEventListener("pagehide",window,Finalize);D2L.LP.Web.UI.Html.Dom.AddEventListener("unload",window,Finalize);D2L.LP.Web.UI.Html.Dom.AddEventListener("beforeunload",window,Finalize);function Heartbeat(){var expired=
D2L.PT.Auth.SessionTimeout.IsExpired();if(expired)return;var currentInterval=timer.lap();ScheduleHeartbeat();stagingTimer.reset();stagingTimer.start(0);if(ifvisible.now("hidden"))stagingTimer.stop();expired=D2L.PT.Auth.SessionTimeout.IsExpired();if(expired)return;var location=(new D2L.LP.Web.Http.UrlLocation(trackViewingLocation)).GetUrl().WithQueryString("time",currentInterval);D2L.LP.Web.UI.Rpc.SendBeacon(location);timer=stagingTimer;stagingTimer=new Tock({});if(!ifvisible.now("hidden")){timer.start();
stagingTimer.start()}if(insertLog)insertLog(currentInterval)}function ScheduleHeartbeat(){if(heartbeatInterval>0){heartbeatTimer=new Tock({countdown:true,complete:Heartbeat});heartbeatTimer.start(heartbeatInterval*6E4)}}ifvisible.on("blur",function(){timer.stop();stagingTimer.stop()});ifvisible.on("focus",function(){timer.start(timer.lap());stagingTimer.start(stagingTimer.lap())});if(!ifvisible.now("hidden")){timer.start();stagingTimer.start()}ScheduleHeartbeat();D2L.LP.Web.UI.Events.OnStorage.AddListener(function(e){if(e.Key===
"Session.Expired")if(e.OldValue==0&&e.NewValue==2){timer.stop();stagingTimer.stop();if(heartbeatTimer)heartbeatTimer.stop()}else if(e.NewValue==0){timer.start(0);stagingTimer.start(0);ScheduleHeartbeat()}});function TestHelper(){var helper=$('<div id="j" style="position: fixed;display: block;left: 0px;bottom: 0px;background-color: lightblue;"><div>J.A.R.V.I.S:</div></div>');$("body").append(helper);helper.append('<div>currentInterval: <span class="timer"></span></div>');helper.append('<div>stagingInterval: <span class="staging"></span></div>');
helper.append('<div>Time until heartbeat: <span class="heartbeat"></span></div>');var log=$("<div></div>");helper.append(log);insertLog=function(interval){var now=new Date;log.append("<div>Heartbeat sent "+now.toISOString()+" with value "+interval+"</div>");if(log.find("div").length>5)log.find("div:first-child").remove()};setInterval(function(){helper.find(".timer").html(timer.lap()/1E3);helper.find(".staging").html(stagingTimer.lap()/1E3);if(heartbeatTimer)helper.find(".heartbeat").html(heartbeatTimer.lap()/
1E3)},100)}document.addEventListener("B299DDE2-362A-4937-8044-3F8046D8D5F3",TestHelper)}};if(window["D2L"]!==undefined&&D2L.LP.Web.Packaging!==undefined)D2L.LP.Web.Packaging.Register("D2L.LE.Content.ContentViewer.default");