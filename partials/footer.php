<?php
    
?>
    
     
</div> <!-- .content -->
    
    

    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <script src="vendors/jquery/dist/jquery.min.js"></script>
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script src="assets/js/bootstrap-datepicker.js"></script>
    <script src="assets/js/bootstrap-datepicker.ru.min.js"></script>
    <script src="vendors/popper.js/dist/umd/popper.min.js"></script>
    
    <!-- <script src="vendors/datatables.net/js/jquery.dataTables.min.js"></script> -->
    <!-- <script src="vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script> -->
    <!-- <script src="vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script> -->
    <!-- <script src="vendors/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script> -->
    
    <script src="build/js/main.js"></script>
    <script>
            /* When the user clicks on the button,
            toggle between hiding and showing the dropdown content */
            function open(e) {
                $('#droplist').toggleClass("show");
            }

            function close(e) {
                $('#droplist').toggleClass("show");
            }

            $('.dropbtn').on('click' , open);
            $('.dropup').on('click' , close);
            // Close the dropdown menu if the user clicks outside of it
            window.onclick = function(event) {
                if (event.target.matches('.droplist')) {
                    var dropdowns = document.getElementsByClassName("dropdown-content");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            }
        </script>

</body>

</html>