//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {

        function barcodeReaderCanvas(dom, dataInp, expl){
            const PAPER_WIDTH = 245;
            const PAPER_HEIGHT = 165;
            const LEFT_MARGIN = 30;
            const TOP_MARGIN = 10;
            const BAR_HEIGHT_L = 110;
            const BAR_HEIGHT_S = 100;
            const [answer, explanation, rv] = expl;

            var paper = Raphael(dom, 
                PAPER_WIDTH,
                PAPER_HEIGHT,
                0, 0);

            var color = {
                blue: "#65A1CF",
                orange: "#FAAB00",
                white: "#FFFFFF",
                black: "#000000",
            };

            var attr = {
                rect: {
                    'stroke': color.blue,
                    'stroke-width': 0,
                    'fill': color.blue
                },
                text: {
                    "stroke": color.black, 
                    'stroke-width': 0,
                    'fill': 'black',
                    "font-size": 18,
                    'font-family': "Verdana",
                },
                text_exp: {
                    "stroke": color.black, 
                    'stroke-width': 0,
                    'fill': color.blue,
                    "font-size": 16,
                    'font-family': "Verdana",
                },
            };

            const r = dataInp.match(/ +|_+/g);
            let mod = LEFT_MARGIN;

            // EAN number
            if (answer){

                //1
                let fst_num_x = 22;
                let left_answer = answer.slice(1, 7).split('');  
                let right_answer = answer.slice(7, 13).split('');
                let rv_deg = 0;
                let num_y = 110;

                if (rv){
                    fst_num_x = 22 + 95*2 + 18;
                    [left_answer, right_answer]
                        = [right_answer.reverse(), left_answer.reverse()];
                    rv_deg = 180;
                    num_y = 0;
                }

                // 1
                paper.text(fst_num_x, num_y + TOP_MARGIN, 
                    answer.slice(0, 1)).attr(attr.text).rotate(rv_deg);

                for (let i = 0; i < 6; i += 1){
                    // 2-7
                    paper.text(45+i*14, num_y + TOP_MARGIN,
                        left_answer.slice(i, i+1)).attr(attr.text).rotate(
                            rv_deg);
                    // 8-13
                    paper.text(135+i*14, num_y + TOP_MARGIN,
                        right_answer.slice(i, i+1)).attr(attr.text).rotate(
                            rv_deg);
                }
            }

            for (let i = 0; i < r.length; i += 1 ){
                let n = r[i].length * 2;
                let height = BAR_HEIGHT_L;
                let top_y = 0;

                if (mod  >= (3)*2 + LEFT_MARGIN
                    && mod < (45)*2 + LEFT_MARGIN 
                    || mod >= (50)*2 + LEFT_MARGIN 
                        && mod < (92)*2 + LEFT_MARGIN){
                    height = BAR_HEIGHT_S;
                    top_y = rv ? 10: 0;
                }

                // draw bar
                if (r[i].slice(0, 1) === '_'){
                    paper.rect(
                        mod,
                        top_y + TOP_MARGIN, 
                        n,
                        height 
                    ).attr(attr.rect).attr("fill", color.black);
                }

                mod += n;
            }

            // explanation text
            const exp_text = paper.text(100, 135 + TOP_MARGIN,
                                explanation).attr(attr.text_exp);
        }

        var $tryit;
        var io = new extIO({
            multipleArguments: false,
            functions: {
                js: 'barcodeReader',
                python: 'barcode_reader'
            },
            animation: function($expl, data){
                barcodeReaderCanvas($expl[0],
                    data.in, data.ext.explanation);
            }
        });
        io.start();
    }
);
