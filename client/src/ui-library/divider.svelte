<span><slot /></span>

<style>
  span {
    position: relative;
    display: inline-flex;
    justify-content: center;
    width: 100%;
    text-align: center;
  }

  span:before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 46%;
    content: ' ';
    border-top: 1px solid #dcdcdc;
  }

  span:after {
    position: absolute;
    top: 50%;
    right: 0;
    width: 46%;
    content: ' ';
    border-top: 1px solid #dcdcdc;
  }
</style>
