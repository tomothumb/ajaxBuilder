# ajaxBuilder

These aer query builders to connect some API service.

## Example

```
<form id="sampleform" action="#" method="post">
  <h2>This is Post example.</h2>
  <p><input type="text" name="user"></p>
  <p><input type="submit" value="POST"></p>
</form>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="./ajax_builder.js"></script>


<script>
  (function(){
    $(function () {
      $("#sampleform").submit(function(event){
        event.preventDefault();

        var aj = new AJAX_BUILDER();
        aj.setDomain(window.location.host);
        aj.setEndpoint("/path-to-send");
        aj.setForm("#sampleform");
        aj.setCallback(function(){
          $(window).trigger("POSTED");
        });
        aj.post();

        $(window).on("POSTED",function(e){
          console.log(aj.getResponse());
        });
      });
    });
  })(jQuery);
</script>
```