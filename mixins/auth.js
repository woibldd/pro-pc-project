import { myCode_key, bigCode_key, redEnvelopeDia_key} from "@/auth/1"
import {address_key, code_key,contract_key,red_packet_contract_key ,createTime_key, sourceAddress_key, bigRedPacketDetails_key} from "@/auth/0"
function g(generator) {
  const result = generator({
    [address_key]: this[sourceAddress_key],
    [code_key]: this[bigRedPacketDetails_key][code_key],
    [contract_key]:this[bigRedPacketDetails_key][contract_key],
    [red_packet_contract_key]:this[bigRedPacketDetails_key][red_packet_contract_key],
    [createTime_key]: this[bigRedPacketDetails_key][createTime_key],
  });
  return result;
}

function p(){
  return {
    [bigCode_key]: this[bigRedPacketDetails_key][code_key] || this.$route.query[code_key],
    [myCode_key]: this[redEnvelopeDia_key],
  }
}
export default {
  methods: {
    g,
    p

  },
};
