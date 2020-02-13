import { moxci } from "../index";
import { parse } from "./options";

const options = parse();

moxci(options._[0], {
  message: options["message"],
  slack_message: options["slack_message"],
  label: options["label"]
});
