(function() {
  const frame = document.querySelector('iframe');
  console.log(frame);
  frame.setAttribute('src', 'http://172.16.8.75:8075/WebReport/ReportServer?formlet=STYLE%2Fnew_style_plan_fc.frm&session_id=0e46ea38-7d4e-4eb5-9f5d-9489ae8586b5');
  frame.contentWindow.stop();
  setTimeout(() => {
    console.log('-------------------------------');
    frame.setAttribute('src', 'http://www.baidu.com');
    frame.contentWindow.stop();
  }, 2000);
})();
